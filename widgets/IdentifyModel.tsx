/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
/// <amd-dependency path="dojo/topic" name="topic" />
/// <amd-dependency path="esri/widgets/Spinner" name="Spinner" />
/// <amd-dependency path="./identify/config" name="config" />

declare const topic: any;
declare const Spinner: any;
declare const config: any;

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import MapView = require("esri/views/MapView");
import watchUtils = require("esri/core/watchUtils");
import Graphic = require("esri/Graphic");
import IdentifyTask = require("esri/tasks/IdentifyTask");
import Collection = require("esri/core/Collection");
import ActionButton from "esri/support/actions/ActionButton";
import IdentifyManyTasks from "./identify/IdentifyManyTasks";
import IdentifyResultsPopup from "./identify/IdentifyResultsAppendPopupTemplates";
import RosreestrCadastreSelectedLayer = require('widgets/rosreestr/RosreestrCadastreSelectedLayer');
import CustomIdentify = require('widgets/rosreestr/customIdentify');

interface IdentifyModelProperties {
  view: MapView 
}

interface coords {
  x: number;
  y: number;
  angel?: number;
}

@subclass('mvs.widgets.IdentifyModel')
class IdentifyModel extends declared(Accessor) {

  @property()
  view: MapView;

  @property()
  spinner: any;

  @property()
  tasks: Collection<IdentifyTask>;

  @property()
  actions: Collection<ActionButton> = new Collection();

  @property()
  cadasteSelection: RosreestrCadastreSelectedLayer;

  @property()
  customIdentify : CustomIdentify = new CustomIdentify({operatingMode : "dependent"});

  @property()
  dependent : any;

  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------
  constructor(properties?: IdentifyModelProperties) {
    super();
    this.view = properties.view;
    this._createSpinner();
    this._createActionButtons();
    this._createListeners();
  }

  private _createSpinner  = (): void =>{
    this.spinner = new Spinner({view: this.view});
    this.view.ui.add(this.spinner);
  }

  private _createActionButtons  = (): void =>{
    config.actions.forEach((action: any) => {
      let actionButton = new ActionButton(action);  
      this.actions.add(actionButton);
    });    
  }

  private _createListeners  = (): void =>{
    this.view.on("click", this._executeIdentifyTasks)
    this.view.popup.watch("selectedFeature", this._highlightFeature);
    watchUtils.whenFalse(this.view.popup, "visible", this._clearGraphic);
    
    // Fires each time an action is clicked
    this.view.popup.on("trigger-action", this._popupAction);
  }

  private _popupAction  = (event: any): void =>{
    let popupNode = this.view.popup.container;       
    let title = event.action.title;        //let title = "Вывести статистику";
    // @ts-ignore
    let iconNode = popupNode.querySelector(`.esri-popup__inline-actions-container > [title="${title}"] > .esri-popup__icon`);
    iconNode.style.color = 'red';         
    var d = new Date();
    var n = ' ' + d.toLocaleTimeString();
    console.log("popup action -> " + event.action.id); 
    let coords = this._getcoords(iconNode);    
    topic.publish("rocket/coords", coords);
    let message = {
      body : event.action.title + n,
      coords : coords
    }
    let topicId = event.action.id
    topic.publish(topicId, message);
  }

  private _getcoords(domNode: HTMLElement): coords {     
    var rect = domNode.getBoundingClientRect();
    let coords = {
      x: (rect.right + rect.left)/2,
      y: (rect.top + rect.bottom)/2,
      angel: 0
    }
    //console.log(rect.top, rect.right, rect.bottom, rect.left);            
    console.log(coords);
    return coords;    
  }  

  private _executeIdentifyTasks  = (event: any): void =>{
    // starting identify - locate spinner at click-point
    this.spinner.show({location : event.mapPoint});

    this.dependent = this.customIdentify.externalIdentification(event);

    let allTasks: IdentifyManyTasks = new IdentifyManyTasks({view : this.view});  
    this.tasks = allTasks.tasks; 
    allTasks.execute (event.mapPoint)
                .then(this._appendPopupInfo)
                .then(this._openPopup)        
  }


// _appendPopupInfo ------------------------------------------------------------------
  private _appendPopupInfo = (response: any): any[] => {  
    let features = new IdentifyResultsPopup().execute(response, this.tasks, this.actions)
    return features;
  }

   // _openPopup ------------------------------------------------------------------
   private _openPopup = (features: any) => {
    // identify is ready - hide spinner
    this.spinner.hide();

    let popupProperties = {
      features: features.concat(this.dependent),
      updateLocationEnabled: false,
      location: this.spinner.location
    }

    if (popupProperties.features.length === 0) {
      // @ts-ignore
      popupProperties.title = "Ничего не найдено";
    }

    this.view.popup.open(popupProperties);
}

  private _highlightFeature = (feature: any): void => {
    if (feature) {
        if (feature.attributes) {
            if (feature.attributes.type) {
                this._clearGraphic();
                this.cadasteSelection.setSelection(feature.attributes);
            } else {
                this._clearGraphic();
                let type = feature.geometry.type;
                if (config.highlightSymbols.hasOwnProperty(type)) {
                    var symbol = config.highlightSymbols[type];
                    var highlightGraphic = new Graphic({
                    geometry: feature.geometry, 
                    symbol: symbol
                    });
                    this.view.graphics.add(highlightGraphic);
                }
            }
        } 
    }
  }

  private _clearGraphic = (): void => {
    this.view.graphics.removeAll();
    this.cadasteSelection.setSelection({
        type : "disable",
        id : '4 = 5'
    });
  }

}

export = IdentifyModel;
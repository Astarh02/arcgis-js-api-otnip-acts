/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
/// <amd-dependency path="./config" name="config" />

declare const config: any;

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import IdentifyTask = require("esri/tasks/IdentifyTask");
import Collection = require("esri/core/Collection");
import ActionButton from "esri/support/actions/ActionButton";


@subclass('mvs.widgets.IdentifyResultsAppendPopupTemplates')
class IdentifyResultsAppendPopupTemplates  extends declared(Accessor) {

  @property()
  actions: Collection<ActionButton>;

  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------
  constructor(properties?: any) {
    super(); 
  }

// execute ------------------------------------------------------------------
  public execute = (response: any, tasks: Collection<IdentifyTask>, actions: Collection<ActionButton>): any[] => {
      
    let identyfyFeatures2d = response.map((promise: any, i: number) => {       
      this.actions = actions;    
      let features = promise.value.results;
      features.forEach((feature: any, j: number) => {
        // @ts-ignore
        feature.operationLayerId =  tasks.getItemAt(i).operationLayerId;
        features[j] = feature;
      });
      return features;      
    });

    //2d array to 1d array
    let identyfyFeatures = [].concat.apply([], identyfyFeatures2d);

    let identyfyFeaturesPopuped = identyfyFeatures.map((result: any) => {
      var feature = result.feature;
      var operationLayerId = result.operationLayerId;
      
      var layerName = result.layerName;
      var layerId = result.layerId.toString();
      var fields = config.identifyServices[operationLayerId][layerId];
      var layerActions = config.identifyServices[operationLayerId]['actions'];
      // do not include features without config into results
      if (!fields) {
        console.log(operationLayerId + "/" + layerId + " (" + layerName + ") fieldset is not configured");
        return null;
      }
      // check for object id prperty
      if (result.feature.attributes.hasOwnProperty('Идентификатор')) {
        var title = `${layerName} (${result.feature.attributes['Идентификатор']})`;
      } else {
        var title = `${layerName} (${result.feature.attributes['OBJECTID']})`;
      }
      // calculate actions buttons list
      var currentActions: any[] = [];
      if (layerActions) {
        currentActions = layerActions.map((layerActionName: any) => {
          let action = this.actions.find((configAction: any) =>{
            return configAction.id === layerActionName;
          })
          return action
        });
      }
      // calculate popup template
      feature.popupTemplate = {
        title: title ,
        content: this._contentPopup(feature, fields),
        actions: currentActions
      };
      console.log(`${operationLayerId}/${layerId} [${layerName}] fieldset is configured`);
      return feature;
    }); 
    let results = identyfyFeaturesPopuped.filter(function(feature: any){
      return (feature != null);
    });
    return results;
  }
  
  private _contentPopup (feature: any, fields: any) { 
    var attributes = feature.attributes;
    var info = "<table>";
    fields.forEach(function (item: any, index: any) {
    if (attributes[item]) {
      if (['Null', 'NULL'].indexOf(attributes[item]) >= 0) {
        attributes[item] = "н/д";
      }
      info += "<tr><td>" + item + "</td><td>" + attributes[item] + "</td></tr>";
    } else {
      console.log("attribute [" + item + "] not found");
    }
    });
    info += "</table>";
    return info;
  };
}

export = IdentifyResultsAppendPopupTemplates;
/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
/// <amd-dependency path="./config" name="config" />

declare const config: any;

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import Accessor = require("esri/core/Accessor");
import MapView = require("esri/views/MapView");
import IdentifyTask = require("esri/tasks/IdentifyTask");
import IdentifyParameters = require("esri/tasks/support/IdentifyParameters");
import Geometry = require("esri/geometry/Geometry");
import promiseUtils = require("esri/core/promiseUtils");
import Collection = require("esri/core/Collection");


@subclass('mvs.widgets.IdentifyManyTasks')
class IdentifyManyTasks  extends declared(Accessor) {

  @property()
  view: MapView;

  @property()
  tasks: Collection<IdentifyTask>;

  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------
  constructor(properties?: any) {
    super();    
    this.view = properties.view;
    this._prepareIdentifyTasks();
  }

  private _prepareIdentifyTasks = (): void => {
    let mapServices = this.view.map.layers.filter(function(layer){
      return layer.visible && config.identifyServices[layer.id];
    });
    this.tasks = mapServices.map(function(layer, i){       
      // @ts-ignore
      let task = new IdentifyTask(layer.url);
           // @ts-ignore
					task.operationLayerId = layer.id; 
					return task;
    });
  }

  public execute = (location: any): any =>{
    let params = this._createIdentifyParams(location);    
    let promises = this.tasks.map(function(task, i){       
      let promise = task.execute(params);
      return promise;      
    });    
    let allTasksAreExecuted = promiseUtils.eachAlways(promises);
    return allTasksAreExecuted;    
  }

  private _createIdentifyParams = (location: Geometry): IdentifyParameters => {
    let view = this.view;    
    let params = new IdentifyParameters(config.identifyParameters);    
    params.width = view.width;
    params.height = view.height;
    params.mapExtent = view.extent;
    params.geometry = location;
    params.layerOption  = 'visible';    
    return params;			
  }

}

export = IdentifyManyTasks;
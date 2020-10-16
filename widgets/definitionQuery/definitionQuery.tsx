/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="dojo/topic" name="topic" />

import { subclass, declared, property } from "esri/core/accessorSupport/decorators";

import Widget from "esri/widgets/Widget";

import { renderable, tsx } from "esri/widgets/support/widget";

import Map = require("esri/Map");

import MapView = require("esri/views/MapView");

import MapImageLayer = require("esri/layers/MapImageLayer");

import FindTask = require("esri/tasks/FindTask");

import FindParameters = require("esri/tasks/support/FindParameters");

import Graphic = require("esri/Graphic");

import OnDemandGrid = require("dgrid/OnDemandGrid");

import Memory = require("dstore/Memory");

import Selection = require("dgrid/Selection");

import declare = require("dojo/_base/declare");

import topic = require("dojo/topic");

import dom = require("dojo/dom");

import on = require("dojo/on");

import domReady = require("dojo/domReady!");

declare const topic : any;

const CSS = {
  base: "esri-queryWidgets",
  counter: "esri-counter-query",
  layerLabel: "esri-layer-label",
  filterLabel: "esri-filter-label",
  settingLabel: "esri-setting-label",
  settingPanel: "esri-panel",
  searchField: "esri-search-box",
  searchButton: "esri-search-button",
  clearSearch: "esri-clear-search",
  clearQuery: "esri-clear-query",
  searchResult: "esri-search-table",
  queryResult: "esri-query-table",
  load: "esri-load"
};

@subclass("esri.widgets.DefinitionQuery")
class DefinitionQuery extends declared(Widget) {
  findTask: any;
  findParams: any;
  definitionLayer:any;
  visibleLayer: boolean = false;
  visiblePanel: boolean = false;
  filter: boolean = false;
  listResult: Array<any> = [];
  listQuery: Array<any> = [];
  gridSearch: any;
  gridQuery: any;
  searchBoxValue:any;
  constructor() {
    super();
  }
  postInitialize() {
    this.ready(this.map, this.layerUrl, this.layerTitle, this.widgetName, this.layerSearchFields);
  }

  @property()
  @renderable()
  layerSearchFields: string[];

  @property()
  @renderable()
  layerTitle: string;

  @property()
  @renderable()
  layerUrl: string;

  @property()
  @renderable()
  outputValues: string[];

  @property()
  @renderable()
  valueNames: string[];

  @property()
  @renderable()
  widgetName: string;

  @property()
  @renderable()
  map: Map;

  @property()
  @renderable()
  view: MapView;

  render() {
    const counter= (
      <div
        bind={this}
        id={this.classes(CSS.counter, this.widgetName)}
        class={this.classes(CSS.counter, this.widgetName)}
      >
        {this.listQuery.length}
      </div>
    )
    const layerLabel = (
      <div
        bind={this}
        id={this.classes(CSS.layerLabel, this.widgetName)}
        class={this.classes(CSS.layerLabel, this.widgetName)}
        onclick={function(){this.VisibleLayer()}}
      >
        {this.layerTitle}
        {counter}
      </div>
    )
    const filterLabel = (
      <div
        bind={this}
        id={this.classes(CSS.filterLabel, this.widgetName)}
        class={this.classes(CSS.filterLabel, this.widgetName)}
        onclick={function(){this.filterOperation()}}
      >
      </div>
    )
    const settingLabel = (
      <div
        bind={this}
        id={this.classes(CSS.settingLabel, this.widgetName)}
        class={this.classes(CSS.settingLabel, this.widgetName)}
        onclick={function(){this.VisiblePanel()}}
      >
      </div>
    )
    const searchField = (
      <input
        bind={this}
        id={this.classes(CSS.searchField, this.widgetName)}
        class={this.classes(CSS.searchField, this.widgetName)}
        type="search"
      />
    )
    const searchButton = (
      <div
        bind={this}
        id={this.classes(CSS.searchButton, this.widgetName)}
        class={this.classes(CSS.searchButton, this.widgetName)}
        onclick={function(){this.searchSettings()}}
      >
        Искать
      </div>
    )
    const clearSearch = (
      <div
        bind={this}
        id={this.classes(CSS.clearSearch, this.widgetName)}
        class={this.classes(CSS.clearSearch, this.widgetName)}
        onclick={function(){this.clearTableSearch()}}
      >
        Очистить
      </div>
    )
    const clearQuery = (
      <div
        bind={this}
        id={this.classes(CSS.clearQuery, this.widgetName)}
        class={this.classes(CSS.clearQuery, this.widgetName)}
        onclick={function(){this.clearTableQuery()}}
      >
        Очистить
      </div>
    )
    const searchResult = (
      <div
        bind={this}
        id={this.classes(CSS.searchResult, this.widgetName)}
        class={this.classes(CSS.searchResult, this.widgetName)}
      >
      </div>
    )
    const queryResult = (
      <div
        bind={this}
        id={this.classes(CSS.queryResult, this.widgetName)}
        class={this.classes(CSS.queryResult, this.widgetName)}
      >
      </div>
    )
    const load = (
      <div
        bind={this}
        id={this.classes(CSS.load, this.widgetName)}
        class={this.classes(CSS.load, this.widgetName)}
      >
      </div>
    )
    const settingPanel = (
      <div
       bind={this}
       id={this.classes(CSS.settingPanel, this.widgetName)}
       class={this.classes(CSS.settingPanel, this.widgetName)}
      >
        {searchField}
        {load}
        {searchButton}
        {searchResult}
        {clearSearch}
        {queryResult}
        {clearQuery}
      </div>
    )
    const base = (
      <div
        bind={this}
        id={this.classes(CSS.base, this.widgetName)}
        class={this.classes(CSS.base, this.widgetName)}
      >
        {layerLabel}
        {filterLabel}
        {settingLabel}
        {settingPanel}
      </div>
    );
    return base;
  }
  private ready(map: Map, layerUrl: string, layerTitle: string, widgetName:string, layerSearchFields: string[]) {
    this.definitionLayer = new MapImageLayer({
      url: layerUrl,
      visible: this.visibleLayer,
      listMode: "hide",
      title: layerTitle,
      id: widgetName,
      sublayers: [{
        id: 0
      }]
    })
    map.add(this.definitionLayer);

    this.findTask = new FindTask({
      url: layerUrl
    });
    this.findParams = new FindParameters({
      layerIds: [0],
      searchFields: layerSearchFields,
      returnGeometry: true
    });
    let inClass = this;
    let a = topic.subscribe("iden/" + this.widgetName, function(a:any) {
      for (let i = 0; i < inClass.listQuery.length; i++) {
        if(inClass.listQuery[i].id == a.id) {
          return;
        }
      }
      inClass.listQuery.push(a);
      inClass.queryTable();
      inClass.OnAnimate(a.geometry);
    })
  }
  private animate(duration:any, timing:Function, draw:Function) {
    let start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {timeFraction = 1};
      let progress = timing(timeFraction);
      draw(progress);
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    }); 
  }
  private OnAnimate(geometry:any) {
    let counter = document.getElementById(CSS.counter + " " + this.widgetName);
    let flip = counter.getBoundingClientRect();
    let positionElem = this.view.toScreen(geometry.centroid);
    let picture = document.createElement("div");
    document.body.appendChild(picture);
    picture.id = "add";
    picture.style.position = "absolute";
    picture.style.display = "block";
    picture.style.left = positionElem.x + "px";
    picture.style.top = positionElem.y + "px";
    picture.style.height = "20px";
    picture.style.width = "20px";
    picture.style.background = "#aaf05a";
    picture.style["text-align"] = "center";
    picture.style["font-size"] = "18px";
    picture.style["border-radius"] = "15px";
    picture.style.color = "white";
    picture.innerText = "+";
    this.animate(
      2000,
      function circ(timeFraction:any) {
        return 1 - Math.sin(Math.acos(timeFraction))
      },
      function(progress:any) {
        picture.style.left = positionElem.x + progress * (flip.left - positionElem.x) + 'px';
        picture.style.top = positionElem.y + progress * (flip.top - positionElem.y) + 'px';
      }
    );
    setTimeout(function() {
      let elem = document.getElementById("add");
      elem.remove();
    }, 2200);
  }
  private VisibleLayer() {
    this.visibleLayer = !this.visibleLayer;
    this.definitionLayer.visible = this.visibleLayer;
    let layerLabel = document.getElementById(CSS.layerLabel + " " + this.widgetName);
    let filter = document.getElementById(CSS.filterLabel + " " + this.widgetName);
    let setting = document.getElementById(CSS.settingLabel + " " + this.widgetName);
    
    if (this.definitionLayer.visible == true) {
      layerLabel.style["background-color"] = "#0079c1";
      layerLabel.style["color"] = "#fff";
      filter.style["pointer-events"] = "all";
      setting.style["pointer-events"] = "all";
    } else if (this.definitionLayer.visible == false) {
      layerLabel.style["background-color"] = "#f5f5f5";
      layerLabel.style["color"] = "#0079c1";
      filter.style["pointer-events"] = "none";
      setting.style["pointer-events"] = "none";
      if (this.visiblePanel == true) {this.VisiblePanel()};
      if (this.filter == true) {this.filterOperation()};
    }
  }
  private VisiblePanel() {
    let panel = document.getElementById(CSS.settingPanel+" "+this.widgetName);
    let setting = document.getElementById(CSS.settingLabel+" "+this.widgetName);
    this.visiblePanel = !this.visiblePanel;
    if (this.visiblePanel == true) {
      panel.style["display"] = "block";
      setting.style["background-color"] = "#0079c1";
      setting.style["color"] = "#f5f5f5";
      this.queryTable();
    } else if (this.visiblePanel == false) {
      panel.style["display"] = "none";
      setting.style["background-color"] = "#f5f5f5";
      setting.style["color"] = "#0079c1";
    }
  }
  private filterOperation() {
    this.filter = !this.filter;
    let filter = document.getElementById(CSS.filterLabel + " " + this.widgetName);
    switch (this.filter) {
      case true:
        filter.style["background-color"] = "#0079c1";
        filter.style["color"] = "#f5f5f5";
        break;
      case false:
        filter.style["background-color"] = "#f5f5f5";
        filter.style["color"] = "#0079c1";
        break;
    }
    this.filterOn();
  }
  private searchSettings() {
    let searchField = document.getElementById(CSS.searchField+" "+this.widgetName);
    let panel = document.getElementById(CSS.settingPanel+" "+this.widgetName);
    let load = document.getElementById(CSS.load+" "+this.widgetName);
    if (searchField["value"] != "") {
      if (searchField["value"] != this.searchBoxValue) {
        load.style.display = "block";
        panel.style["pointer-events"] = "none";
        panel.style.opacity = "0.75";
        this.searchBoxValue = searchField["value"];
        this.findParams.searchText = searchField["value"];
        let inClass = this;
        this.findTask.execute(this.findParams).then(function(response:any){inClass.searchResults(response), inClass.resultFormation()});
      }
    } else if (searchField["value"] == "") {
      return;
    }
  }
  private searchResults(response: any) {
    let inClass = this;
    this.listResult = response.results.map(function(item:any) {
      let title = "";
      for (let i = 0; i < inClass.outputValues.length; i++) {
        if (i == inClass.outputValues.length-1) {
          title += item.feature.attributes[inClass.outputValues[i]];
        } else {
          title += item.feature.attributes[inClass.outputValues[i]] + " / ";
        }
      }
      return {
          id: item.feature.attributes.OBJECTID,
          title: title,
          geometry: item.feature.geometry,
          query: false,
          type : inClass.layerTitle,
          feature : item.feature
      }
    })
  }
  private resultFormation() {
    if (this.gridSearch != undefined || this.gridSearch != null) {
      this.gridSearch.destroy();
    }
    let button = document.getElementById(CSS.clearSearch+" "+this.widgetName);
    let table = document.getElementById(CSS.searchResult+" "+this.widgetName);
    button.style.display = "block";
    table.style.display = "block";

    let grid = document.createElement("div");
    const results = document.getElementById(CSS.searchResult+" "+this.widgetName);
    results.appendChild(grid);
    
    var myStore = new Memory({
      data: this.listResult
    });
    let labelCol = "";
    for (let i = 0; i < this.valueNames.length; i++) {
      if (i == this.valueNames.length-1) {
        labelCol += this.valueNames[i];
      } else {
        labelCol += this.valueNames[i] + " / ";
      }
    }
    var columns = {
      object:{
        label: labelCol,
        field: "title"
      },
      zoom:{
        label: "Показать",
        field: ""
      },
      circuit:{
        label: "Выделить",
        field: ""
      }
    };
    
    this.gridSearch = new OnDemandGrid({
      collection: myStore,
      columns: columns,
      selectionMode: 'single',
      loadingMessage: "Загрузка данных...",
      noDataMessage: "Результаты не найдены"
    }, grid);
    
    let load = document.getElementById(CSS.load+" "+this.widgetName);
    let panel = document.getElementById(CSS.settingPanel+" "+this.widgetName);
    
    load.style.display = "none";
    panel.style["pointer-events"] = "all";
    panel.style.opacity = "1";

    let inClass = this;
    
    this.gridSearch.on('.field-zoom:click', function (event:any) {
      let cell = inClass.gridSearch.cell(event);
      inClass.goToMap(cell.row.data.geometry);
    });

    this.gridSearch.on('.field-circuit:click', function (event:any) {
        var cell = inClass.gridSearch.cell(event);
        topic.publish("input_relation", {
            feature : cell.row.data.feature,
            type : cell.row.data.type
        });
    });
    
    this.gridSearch.on(".field-title:click", function(event:any) {
      var cell = inClass.gridSearch.cell(event);
      for (let i = 0; i < inClass.listQuery.length; i++) {
        if(inClass.listQuery[i].id == cell.row.data.id) {
          return;
        }
      }
			inClass.listQuery.push(cell.row.data);
      inClass.queryTable();
    })
  }
  private clearTableSearch() {
    if (this.gridSearch != undefined || this.gridSearch != null) {
      this.gridSearch.destroy();
    }
    let button = document.getElementById(CSS.clearSearch+" "+this.widgetName);
    let table = document.getElementById(CSS.searchResult+" "+this.widgetName);
    let input = document.getElementById(CSS.searchField+" "+this.widgetName);
    button.style.display = "none";
    table.style.display = "none";
    input["value"] = "";
    this.searchBoxValue = null;
  }
  private queryTable() {
    if (this.gridQuery != undefined || this.gridQuery != null) {
      this.gridQuery.destroy();
    }

    let button = document.getElementById(CSS.clearQuery+" "+this.widgetName);
    let table = document.getElementById(CSS.queryResult+" "+this.widgetName);
    button.style.display = "block";
    table.style.display = "block";
    
    let grid = document.createElement("div");
    const results = document.getElementById(CSS.queryResult+" "+this.widgetName);
    results.appendChild(grid);
    
    var myStore = new Memory({
      data: this.listQuery
    });
    let labelCol = "";
    for (let i = 0; i < this.valueNames.length; i++) {
      if (i == this.valueNames.length-1) {
        labelCol += this.valueNames[i];
      } else {
        labelCol += this.valueNames[i] + " / ";
      }
    }
    var columns = {
      object:{
        label: labelCol,
        field: "title"
      },
      zoom:{
        label: "Приблизить",
        field: ""
      },
      circuit:{
        label: "Выделить",
        field: ""
      }
    };
    
    this.gridQuery = new OnDemandGrid({
      collection: myStore,
      columns: columns,
      selectionMode: 'single',
      loadingMessage: "Загрузка данных...",
      noDataMessage: "Результаты не найдены"
    }, grid);

    let counter = document.getElementById(CSS.counter + " " + this.widgetName);
    if (this.listQuery.length == 0) {
      this.clearTableQuery();
      counter.style["display"] = "none";
    } else if (this.listQuery.length > 0) {
      counter.style["display"] = "block";
    }

    let inClass = this;

    this.gridSearch.on('.field-circuit:click', function (event:any) {
        var cell = inClass.gridSearch.cell(event);
        topic.publish("input_relation", {
            feature : cell.row.data.feature,
            type : cell.row.data.type
        });
    });
    
    this.gridQuery.on('.field-zoom:click', function (event:any) {
      let cell = inClass.gridQuery.cell(event);
      inClass.goToMap(cell.row.data.geometry);
    });

    this.gridQuery.on(".field-title:click", function(event:any) {
      let index;
      let cell = inClass.gridQuery.cell(event);
      inClass.listQuery.forEach(function(item, i) {
        if (item.id == cell.row.data.id) {
          index = i;
        }
      });
      inClass.listQuery.splice(index, 1)
      inClass.queryTable();
    });
    
    this.filterOn();
    this.scheduleRender();
  }
  private clearTableQuery() {
    if (this.gridQuery != undefined || this.gridQuery != null) {
      this.gridQuery.destroy();
    }
    let button = document.getElementById(CSS.clearQuery + " " + this.widgetName);
    let table = document.getElementById(CSS.queryResult + " " + this.widgetName);
    let counter = document.getElementById(CSS.counter + " " + this.widgetName);
    this.listQuery = [];
    button.style.display = "none";
    table.style.display = "none";
    counter.style.display = "none";
    const project = this.definitionLayer.findSublayerById(0);
    project.definitionExpression = "";
    this.definitionLayer.refresh();
  }
  private filterOn() {
    if (this.listQuery.length == 0) {
      this.clearTableQuery();
    } else if (this.listQuery.length > 0) {
      if (this.filter == true) {
        const project = this.definitionLayer.findSublayerById(0);
        let arrayQuery = this.listQuery.map(function(element) {
          return element.id;
        });
        project.definitionExpression = "OBJECTID IN " + "(" + arrayQuery + ")";
        this.definitionLayer.refresh();
      } else if (this.filter == false) {
        const project = this.definitionLayer.findSublayerById(0);
        project.definitionExpression = "";
        this.definitionLayer.refresh();
      }
    }
  }
  private goToMap(geometry: any) {
    let view = this.view
    
    view.goTo({
      target: geometry,
      zoom: 7
    });
    
    var polygon = geometry;
    var fillSymbol = {type: "simple-fill", color: [0, 0, 0, 0.5]};
    var polygonGraphic = new Graphic({geometry: polygon, symbol: fillSymbol});
    polygonGraphic.geometry.spatialReference = geometry.spatialReference;
    view.graphics.add(polygonGraphic);
    
    function remove() {
      view.graphics.removeAll();
    }
    setTimeout(remove, 2500);
  }
}
export = DefinitionQuery;
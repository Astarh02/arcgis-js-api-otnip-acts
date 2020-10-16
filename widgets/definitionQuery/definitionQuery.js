/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="dojo/topic" name="topic" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/topic", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/layers/MapImageLayer", "esri/tasks/FindTask", "esri/tasks/support/FindParameters", "esri/Graphic", "dgrid/OnDemandGrid", "dstore/Memory"], function (require, exports, __extends, __decorate, topic, decorators_1, Widget_1, widget_1, MapImageLayer, FindTask, FindParameters, Graphic, OnDemandGrid, Memory) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    var CSS = {
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
    var DefinitionQuery = /** @class */ (function (_super) {
        __extends(DefinitionQuery, _super);
        function DefinitionQuery() {
            var _this = _super.call(this) || this;
            _this.visibleLayer = false;
            _this.visiblePanel = false;
            _this.filter = false;
            _this.listResult = [];
            _this.listQuery = [];
            return _this;
        }
        DefinitionQuery.prototype.postInitialize = function () {
            this.ready(this.map, this.layerUrl, this.layerTitle, this.widgetName, this.layerSearchFields);
        };
        DefinitionQuery.prototype.render = function () {
            var counter = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.counter, this.widgetName), class: this.classes(CSS.counter, this.widgetName) }, this.listQuery.length));
            var layerLabel = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.layerLabel, this.widgetName), class: this.classes(CSS.layerLabel, this.widgetName), onclick: function () { this.VisibleLayer(); } },
                this.layerTitle,
                counter));
            var filterLabel = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.filterLabel, this.widgetName), class: this.classes(CSS.filterLabel, this.widgetName), onclick: function () { this.filterOperation(); } }));
            var settingLabel = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.settingLabel, this.widgetName), class: this.classes(CSS.settingLabel, this.widgetName), onclick: function () { this.VisiblePanel(); } }));
            var searchField = (widget_1.tsx("input", { bind: this, id: this.classes(CSS.searchField, this.widgetName), class: this.classes(CSS.searchField, this.widgetName), type: "search" }));
            var searchButton = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.searchButton, this.widgetName), class: this.classes(CSS.searchButton, this.widgetName), onclick: function () { this.searchSettings(); } }, "\u0418\u0441\u043A\u0430\u0442\u044C"));
            var clearSearch = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.clearSearch, this.widgetName), class: this.classes(CSS.clearSearch, this.widgetName), onclick: function () { this.clearTableSearch(); } }, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"));
            var clearQuery = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.clearQuery, this.widgetName), class: this.classes(CSS.clearQuery, this.widgetName), onclick: function () { this.clearTableQuery(); } }, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C"));
            var searchResult = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.searchResult, this.widgetName), class: this.classes(CSS.searchResult, this.widgetName) }));
            var queryResult = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.queryResult, this.widgetName), class: this.classes(CSS.queryResult, this.widgetName) }));
            var load = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.load, this.widgetName), class: this.classes(CSS.load, this.widgetName) }));
            var settingPanel = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.settingPanel, this.widgetName), class: this.classes(CSS.settingPanel, this.widgetName) },
                searchField,
                load,
                searchButton,
                searchResult,
                clearSearch,
                queryResult,
                clearQuery));
            var base = (widget_1.tsx("div", { bind: this, id: this.classes(CSS.base, this.widgetName), class: this.classes(CSS.base, this.widgetName) },
                layerLabel,
                filterLabel,
                settingLabel,
                settingPanel));
            return base;
        };
        DefinitionQuery.prototype.ready = function (map, layerUrl, layerTitle, widgetName, layerSearchFields) {
            this.definitionLayer = new MapImageLayer({
                url: layerUrl,
                visible: this.visibleLayer,
                listMode: "hide",
                title: layerTitle,
                id: widgetName,
                sublayers: [{
                        id: 0
                    }]
            });
            map.add(this.definitionLayer);
            this.findTask = new FindTask({
                url: layerUrl
            });
            this.findParams = new FindParameters({
                layerIds: [0],
                searchFields: layerSearchFields,
                returnGeometry: true
            });
            var inClass = this;
            var a = topic.subscribe("iden/" + this.widgetName, function (a) {
                for (var i = 0; i < inClass.listQuery.length; i++) {
                    if (inClass.listQuery[i].id == a.id) {
                        return;
                    }
                }
                inClass.listQuery.push(a);
                inClass.queryTable();
                inClass.OnAnimate(a.geometry);
            });
        };
        DefinitionQuery.prototype.animate = function (duration, timing, draw) {
            var start = performance.now();
            requestAnimationFrame(function animate(time) {
                var timeFraction = (time - start) / duration;
                if (timeFraction > 1) {
                    timeFraction = 1;
                }
                ;
                var progress = timing(timeFraction);
                draw(progress);
                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                }
            });
        };
        DefinitionQuery.prototype.OnAnimate = function (geometry) {
            var counter = document.getElementById(CSS.counter + " " + this.widgetName);
            var flip = counter.getBoundingClientRect();
            var positionElem = this.view.toScreen(geometry.centroid);
            var picture = document.createElement("div");
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
            this.animate(2000, function circ(timeFraction) {
                return 1 - Math.sin(Math.acos(timeFraction));
            }, function (progress) {
                picture.style.left = positionElem.x + progress * (flip.left - positionElem.x) + 'px';
                picture.style.top = positionElem.y + progress * (flip.top - positionElem.y) + 'px';
            });
            setTimeout(function () {
                var elem = document.getElementById("add");
                elem.remove();
            }, 2200);
        };
        DefinitionQuery.prototype.VisibleLayer = function () {
            this.visibleLayer = !this.visibleLayer;
            this.definitionLayer.visible = this.visibleLayer;
            var layerLabel = document.getElementById(CSS.layerLabel + " " + this.widgetName);
            var filter = document.getElementById(CSS.filterLabel + " " + this.widgetName);
            var setting = document.getElementById(CSS.settingLabel + " " + this.widgetName);
            if (this.definitionLayer.visible == true) {
                layerLabel.style["background-color"] = "#0079c1";
                layerLabel.style["color"] = "#fff";
                filter.style["pointer-events"] = "all";
                setting.style["pointer-events"] = "all";
            }
            else if (this.definitionLayer.visible == false) {
                layerLabel.style["background-color"] = "#f5f5f5";
                layerLabel.style["color"] = "#0079c1";
                filter.style["pointer-events"] = "none";
                setting.style["pointer-events"] = "none";
                if (this.visiblePanel == true) {
                    this.VisiblePanel();
                }
                ;
                if (this.filter == true) {
                    this.filterOperation();
                }
                ;
            }
        };
        DefinitionQuery.prototype.VisiblePanel = function () {
            var panel = document.getElementById(CSS.settingPanel + " " + this.widgetName);
            var setting = document.getElementById(CSS.settingLabel + " " + this.widgetName);
            this.visiblePanel = !this.visiblePanel;
            if (this.visiblePanel == true) {
                panel.style["display"] = "block";
                setting.style["background-color"] = "#0079c1";
                setting.style["color"] = "#f5f5f5";
                this.queryTable();
            }
            else if (this.visiblePanel == false) {
                panel.style["display"] = "none";
                setting.style["background-color"] = "#f5f5f5";
                setting.style["color"] = "#0079c1";
            }
        };
        DefinitionQuery.prototype.filterOperation = function () {
            this.filter = !this.filter;
            var filter = document.getElementById(CSS.filterLabel + " " + this.widgetName);
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
        };
        DefinitionQuery.prototype.searchSettings = function () {
            var searchField = document.getElementById(CSS.searchField + " " + this.widgetName);
            var panel = document.getElementById(CSS.settingPanel + " " + this.widgetName);
            var load = document.getElementById(CSS.load + " " + this.widgetName);
            if (searchField["value"] != "") {
                if (searchField["value"] != this.searchBoxValue) {
                    load.style.display = "block";
                    panel.style["pointer-events"] = "none";
                    panel.style.opacity = "0.75";
                    this.searchBoxValue = searchField["value"];
                    this.findParams.searchText = searchField["value"];
                    var inClass_1 = this;
                    this.findTask.execute(this.findParams).then(function (response) { inClass_1.searchResults(response), inClass_1.resultFormation(); });
                }
            }
            else if (searchField["value"] == "") {
                return;
            }
        };
        DefinitionQuery.prototype.searchResults = function (response) {
            var inClass = this;
            this.listResult = response.results.map(function (item) {
                var title = "";
                for (var i = 0; i < inClass.outputValues.length; i++) {
                    if (i == inClass.outputValues.length - 1) {
                        title += item.feature.attributes[inClass.outputValues[i]];
                    }
                    else {
                        title += item.feature.attributes[inClass.outputValues[i]] + " / ";
                    }
                }
                return {
                    id: item.feature.attributes.OBJECTID,
                    title: title,
                    geometry: item.feature.geometry,
                    query: false,
                    type: inClass.layerTitle,
                    feature: item.feature
                };
            });
        };
        DefinitionQuery.prototype.resultFormation = function () {
            if (this.gridSearch != undefined || this.gridSearch != null) {
                this.gridSearch.destroy();
            }
            var button = document.getElementById(CSS.clearSearch + " " + this.widgetName);
            var table = document.getElementById(CSS.searchResult + " " + this.widgetName);
            button.style.display = "block";
            table.style.display = "block";
            var grid = document.createElement("div");
            var results = document.getElementById(CSS.searchResult + " " + this.widgetName);
            results.appendChild(grid);
            var myStore = new Memory({
                data: this.listResult
            });
            var labelCol = "";
            for (var i = 0; i < this.valueNames.length; i++) {
                if (i == this.valueNames.length - 1) {
                    labelCol += this.valueNames[i];
                }
                else {
                    labelCol += this.valueNames[i] + " / ";
                }
            }
            var columns = {
                object: {
                    label: labelCol,
                    field: "title"
                },
                zoom: {
                    label: "Показать",
                    field: ""
                },
                circuit: {
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
            var load = document.getElementById(CSS.load + " " + this.widgetName);
            var panel = document.getElementById(CSS.settingPanel + " " + this.widgetName);
            load.style.display = "none";
            panel.style["pointer-events"] = "all";
            panel.style.opacity = "1";
            var inClass = this;
            this.gridSearch.on('.field-zoom:click', function (event) {
                var cell = inClass.gridSearch.cell(event);
                inClass.goToMap(cell.row.data.geometry);
            });
            this.gridSearch.on('.field-circuit:click', function (event) {
                var cell = inClass.gridSearch.cell(event);
                topic.publish("input_relation", {
                    feature: cell.row.data.feature,
                    type: cell.row.data.type
                });
            });
            this.gridSearch.on(".field-title:click", function (event) {
                var cell = inClass.gridSearch.cell(event);
                for (var i = 0; i < inClass.listQuery.length; i++) {
                    if (inClass.listQuery[i].id == cell.row.data.id) {
                        return;
                    }
                }
                inClass.listQuery.push(cell.row.data);
                inClass.queryTable();
            });
        };
        DefinitionQuery.prototype.clearTableSearch = function () {
            if (this.gridSearch != undefined || this.gridSearch != null) {
                this.gridSearch.destroy();
            }
            var button = document.getElementById(CSS.clearSearch + " " + this.widgetName);
            var table = document.getElementById(CSS.searchResult + " " + this.widgetName);
            var input = document.getElementById(CSS.searchField + " " + this.widgetName);
            button.style.display = "none";
            table.style.display = "none";
            input["value"] = "";
            this.searchBoxValue = null;
        };
        DefinitionQuery.prototype.queryTable = function () {
            if (this.gridQuery != undefined || this.gridQuery != null) {
                this.gridQuery.destroy();
            }
            var button = document.getElementById(CSS.clearQuery + " " + this.widgetName);
            var table = document.getElementById(CSS.queryResult + " " + this.widgetName);
            button.style.display = "block";
            table.style.display = "block";
            var grid = document.createElement("div");
            var results = document.getElementById(CSS.queryResult + " " + this.widgetName);
            results.appendChild(grid);
            var myStore = new Memory({
                data: this.listQuery
            });
            var labelCol = "";
            for (var i = 0; i < this.valueNames.length; i++) {
                if (i == this.valueNames.length - 1) {
                    labelCol += this.valueNames[i];
                }
                else {
                    labelCol += this.valueNames[i] + " / ";
                }
            }
            var columns = {
                object: {
                    label: labelCol,
                    field: "title"
                },
                zoom: {
                    label: "Приблизить",
                    field: ""
                },
                circuit: {
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
            var counter = document.getElementById(CSS.counter + " " + this.widgetName);
            if (this.listQuery.length == 0) {
                this.clearTableQuery();
                counter.style["display"] = "none";
            }
            else if (this.listQuery.length > 0) {
                counter.style["display"] = "block";
            }
            var inClass = this;
            this.gridSearch.on('.field-circuit:click', function (event) {
                var cell = inClass.gridSearch.cell(event);
                topic.publish("input_relation", {
                    feature: cell.row.data.feature,
                    type: cell.row.data.type
                });
            });
            this.gridQuery.on('.field-zoom:click', function (event) {
                var cell = inClass.gridQuery.cell(event);
                inClass.goToMap(cell.row.data.geometry);
            });
            this.gridQuery.on(".field-title:click", function (event) {
                var index;
                var cell = inClass.gridQuery.cell(event);
                inClass.listQuery.forEach(function (item, i) {
                    if (item.id == cell.row.data.id) {
                        index = i;
                    }
                });
                inClass.listQuery.splice(index, 1);
                inClass.queryTable();
            });
            this.filterOn();
            this.scheduleRender();
        };
        DefinitionQuery.prototype.clearTableQuery = function () {
            if (this.gridQuery != undefined || this.gridQuery != null) {
                this.gridQuery.destroy();
            }
            var button = document.getElementById(CSS.clearQuery + " " + this.widgetName);
            var table = document.getElementById(CSS.queryResult + " " + this.widgetName);
            var counter = document.getElementById(CSS.counter + " " + this.widgetName);
            this.listQuery = [];
            button.style.display = "none";
            table.style.display = "none";
            counter.style.display = "none";
            var project = this.definitionLayer.findSublayerById(0);
            project.definitionExpression = "";
            this.definitionLayer.refresh();
        };
        DefinitionQuery.prototype.filterOn = function () {
            if (this.listQuery.length == 0) {
                this.clearTableQuery();
            }
            else if (this.listQuery.length > 0) {
                if (this.filter == true) {
                    var project = this.definitionLayer.findSublayerById(0);
                    var arrayQuery = this.listQuery.map(function (element) {
                        return element.id;
                    });
                    project.definitionExpression = "OBJECTID IN " + "(" + arrayQuery + ")";
                    this.definitionLayer.refresh();
                }
                else if (this.filter == false) {
                    var project = this.definitionLayer.findSublayerById(0);
                    project.definitionExpression = "";
                    this.definitionLayer.refresh();
                }
            }
        };
        DefinitionQuery.prototype.goToMap = function (geometry) {
            var view = this.view;
            view.goTo({
                target: geometry,
                zoom: 7
            });
            var polygon = geometry;
            var fillSymbol = { type: "simple-fill", color: [0, 0, 0, 0.5] };
            var polygonGraphic = new Graphic({ geometry: polygon, symbol: fillSymbol });
            polygonGraphic.geometry.spatialReference = geometry.spatialReference;
            view.graphics.add(polygonGraphic);
            function remove() {
                view.graphics.removeAll();
            }
            setTimeout(remove, 2500);
        };
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "layerSearchFields", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "layerTitle", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "layerUrl", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "outputValues", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "valueNames", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "widgetName", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "map", void 0);
        __decorate([
            decorators_1.property(),
            widget_1.renderable()
        ], DefinitionQuery.prototype, "view", void 0);
        DefinitionQuery = __decorate([
            decorators_1.subclass("esri.widgets.DefinitionQuery")
        ], DefinitionQuery);
        return DefinitionQuery;
    }(decorators_1.declared(Widget_1.default)));
    return DefinitionQuery;
});
//# sourceMappingURL=definitionQuery.js.map
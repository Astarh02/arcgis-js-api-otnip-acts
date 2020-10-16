/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/widgets/Spinner", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/Graphic", "esri/geometry/Polygon", "esri/geometry/Point", "widgets/rosreestr/TableConverter"], function (require, exports, __extends, __decorate, Spiner, decorators_1, Widget_1, Graphic, Polygon, Point, TableConverter) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    var customIdentify = /** @class */ (function (_super) {
        __extends(customIdentify, _super);
        function customIdentify(properties) {
            var _this = _super.call(this) || this;
            _this.operatingMode = "autonomic" || "dependent";
            return _this;
        }
        customIdentify.prototype.postInitialize = function () {
            var _this = this;
            if (this.operatingMode == "autonomic") {
                this.autoCast = this.view.on("click", function (event) { _this.logic(event); });
            }
            else if (this.operatingMode == "dependent") {
                this.autoCast = null;
            }
        };
        customIdentify.prototype.logic = function (event) {
            var _this = this;
            var layers = [1, 5];
            var allResults = [];
            this.spiner = new Spiner({
                view: this.view
            });
            this.view.ui.add(this.spiner);
            this.spiner.show({
                location: event.mapPoint
            });
            this.view.popup.autoOpenEnabled = false;
            layers.forEach(function (number) {
                var url = "https://pkk.rosreestr.ru/api/features/" + number + "?text=" + event.mapPoint.latitude + "+" + event.mapPoint.longitude;
                var xml = new XMLHttpRequest();
                xml.open("GET", url, false);
                xml.send();
                var results = JSON.parse(xml.responseText);
                var resultsFeature = results.features.map(function (feature) {
                    var urlFeature = "https://pkk.rosreestr.ru/api/features/" + number + "/" + feature.attrs.id;
                    var xmlFeature = new XMLHttpRequest();
                    xmlFeature.open("GET", urlFeature, false);
                    xmlFeature.send();
                    var resultFeature = JSON.parse(xmlFeature.responseText);
                    var graphic = new Graphic({
                        geometry: new Polygon({
                            rings: [
                                [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymin],
                                [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymin],
                                [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymax],
                                [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymax],
                            ],
                            spatialReference: {
                                wkid: 102100
                            },
                        }),
                        attributes: feature
                    });
                    _this.cadasteSelection.setSelection(feature);
                    var graphPopup = new TableConverter().convert(graphic, resultFeature.feature, number);
                    return graphPopup;
                });
                allResults = allResults.concat(resultsFeature);
            });
            this.spiner.hide();
            if (allResults.length == 0) {
                return this.view.popup.open({
                    location: event.mapPoint,
                    title: "Ничего не найдено",
                    content: "В данной точке на карте нет объектов идентификации."
                });
            }
            if (allResults[0].geometry) {
                this.view.popup.location = allResults[0].geometry.extent.center;
            }
            else {
                this.view.popup.location = new Point({
                    x: allResults[0].attributes.center.x,
                    y: allResults[0].attributes.center.y,
                    spatialReference: {
                        wkid: 102100
                    },
                });
            }
            this.view.popup.open({
                fetchFeatures: true,
                features: allResults,
                location: allResults[0].geometry.extent.center
            });
            this.view.goTo(allResults[0]);
            this.cadasteSelection.setSelection(allResults[0].attributes);
            this.view.popup.watch("selectedFeature", function (object) {
                _this.cadasteSelection.setSelection(object.attributes);
                // this.view.popup.location = object.geometry.centroid
            });
            this.view.popup.watch("visible", function (visible) {
                if (!visible) {
                    _this.cadasteSelection.setSelection({
                        type: "disable",
                        id: '4 = 5'
                    });
                }
            });
        };
        /**
         * externalIdentification
         */
        customIdentify.prototype.externalIdentification = function (event) {
            var layers = [1, 5];
            var allResults = [];
            layers.forEach(function (number) {
                var url = "https://pkk.rosreestr.ru/api/features/" + number + "?text=" + event.mapPoint.latitude + "+" + event.mapPoint.longitude;
                var xml = new XMLHttpRequest();
                xml.open("GET", url, false);
                xml.send();
                var results = JSON.parse(xml.responseText);
                var resultsFeature = results.features.map(function (feature) {
                    var urlFeature = "https://pkk.rosreestr.ru/api/features/" + number + "/" + feature.attrs.id;
                    var xmlFeature = new XMLHttpRequest();
                    xmlFeature.open("GET", urlFeature, false);
                    xmlFeature.send();
                    var resultFeature = JSON.parse(xmlFeature.responseText);
                    var graphic = new Graphic({
                        geometry: new Polygon({
                            rings: [
                                [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymin],
                                [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymin],
                                [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymax],
                                [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymax],
                            ],
                            spatialReference: {
                                wkid: 102100
                            },
                        }),
                        attributes: feature
                    });
                    var graphPopup = new TableConverter().convert(graphic, resultFeature.feature, number);
                    return graphPopup;
                });
                allResults = allResults.concat(resultsFeature);
            });
            return allResults;
        };
        __decorate([
            decorators_1.property()
        ], customIdentify.prototype, "cadasteSelection", void 0);
        __decorate([
            decorators_1.property()
        ], customIdentify.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], customIdentify.prototype, "spiner", void 0);
        __decorate([
            decorators_1.property()
        ], customIdentify.prototype, "operatingMode", void 0);
        customIdentify = __decorate([
            decorators_1.subclass('mvs.widgets.customIdentify')
        ], customIdentify);
        return customIdentify;
    }(decorators_1.declared(Widget_1.default)));
    return customIdentify;
});
//# sourceMappingURL=customIdentify.js.map
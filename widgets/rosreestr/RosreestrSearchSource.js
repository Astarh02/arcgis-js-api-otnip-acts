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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/widgets/Search/SearchSource", "esri/request", "esri/Graphic", "esri/geometry/Polygon", "widgets/rosreestr/TableConverter"], function (require, exports, __extends, __decorate, decorators_1, SearchSource, esriRequest, Graphic, Polygon, TableConverter) {
    "use strict";
    var RosreestrSearchSource = /** @class */ (function (_super) {
        __extends(RosreestrSearchSource, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function RosreestrSearchSource(properties) {
            var _this = _super.call(this) || this;
            _this.tableConverter = new TableConverter();
            _this.getSuggestions = function (params) {
                return esriRequest(_this.suggestionsUrl, {
                    query: {
                        text: params.suggestTerm
                    },
                    responseType: "json"
                }).then(function (response) {
                    return response.data.results.map(function (item, i) {
                        return {
                            key: i,
                            text: item.title,
                            sourceIndex: params.sourceIndex
                        };
                    });
                });
            };
            // УЧАСТОК = 77:08:0002010:26
            // ОКС = 77:08:0002010:1002
            _this.getResults = function (params) {
                return esriRequest(_this.resultsUrl, {
                    query: {
                        text: params.suggestResult.text.replace(/ /g, "+"),
                        limit: 40,
                        skip: 0
                    },
                    responseType: "json"
                })
                    .then(function (response) {
                    console.log(response);
                    return response.data.features.map(function (feature, i) {
                        var graphic = new Graphic({
                            geometry: new Polygon({
                                rings: [
                                    [feature.extent.xmin, feature.extent.ymin],
                                    [feature.extent.xmax, feature.extent.ymin],
                                    [feature.extent.xmax, feature.extent.ymax],
                                    [feature.extent.xmin, feature.extent.ymax],
                                ],
                                spatialReference: {
                                    wkid: 102100
                                },
                            }),
                            attributes: feature
                        });
                        feature.extent.spatialReference = {
                            wkid: 102100
                        };
                        var xml = new XMLHttpRequest();
                        xml.open("GET", _this.resultsUrl + "/" + feature.attrs.id, false);
                        xml.send();
                        var XMLresult = JSON.parse(xml.responseText);
                        var graphPopup = _this.tableConverter.convert(graphic, XMLresult.feature, feature.type);
                        _this.cadasteSelection.setSelection(feature);
                        _this.view.popup.autoOpenEnabled = false;
                        _this.view.popup.open({
                            fetchFeatures: true,
                            features: [graphPopup],
                            location: graphic.geometry.extent.center
                        });
                        // this.view.popup.watch("visible", (visible) => {
                        //     if (!visible) {
                        //         this.cadasteSelection.setSelection({
                        //             type : "disable",
                        //             id : '4 = 5'
                        //         });
                        //     }
                        // })
                        _this.view.goTo(graphPopup);
                    });
                });
            };
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], RosreestrSearchSource.prototype, "suggestionsUrl", void 0);
        __decorate([
            decorators_1.property()
        ], RosreestrSearchSource.prototype, "resultsUrl", void 0);
        __decorate([
            decorators_1.property()
        ], RosreestrSearchSource.prototype, "cadasteSelection", void 0);
        __decorate([
            decorators_1.property()
        ], RosreestrSearchSource.prototype, "tableConverter", void 0);
        __decorate([
            decorators_1.property()
        ], RosreestrSearchSource.prototype, "view", void 0);
        RosreestrSearchSource = __decorate([
            decorators_1.subclass('mvs.widgets.RosreestrSearchSource')
        ], RosreestrSearchSource);
        return RosreestrSearchSource;
    }(decorators_1.declared(SearchSource)));
    return RosreestrSearchSource;
});
//# sourceMappingURL=RosreestrSearchSource.js.map
/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
/// <amd-dependency path="./config" name="config" />
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "./config", "esri/core/accessorSupport/decorators", "esri/core/Accessor"], function (require, exports, __extends, __decorate, config, decorators_1, Accessor) {
    "use strict";
    var IdentifyResultsAppendPopupTemplates = /** @class */ (function (_super) {
        __extends(IdentifyResultsAppendPopupTemplates, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function IdentifyResultsAppendPopupTemplates(properties) {
            var _this = _super.call(this) || this;
            // execute ------------------------------------------------------------------
            _this.execute = function (response, tasks, actions) {
                var identyfyFeatures2d = response.map(function (promise, i) {
                    _this.actions = actions;
                    var features = promise.value.results;
                    features.forEach(function (feature, j) {
                        // @ts-ignore
                        feature.operationLayerId = tasks.getItemAt(i).operationLayerId;
                        features[j] = feature;
                    });
                    return features;
                });
                //2d array to 1d array
                var identyfyFeatures = [].concat.apply([], identyfyFeatures2d);
                var identyfyFeaturesPopuped = identyfyFeatures.map(function (result) {
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
                        var title = layerName + " (" + result.feature.attributes['Идентификатор'] + ")";
                    }
                    else {
                        var title = layerName + " (" + result.feature.attributes['OBJECTID'] + ")";
                    }
                    // calculate actions buttons list
                    var currentActions = [];
                    if (layerActions) {
                        currentActions = layerActions.map(function (layerActionName) {
                            var action = _this.actions.find(function (configAction) {
                                return configAction.id === layerActionName;
                            });
                            return action;
                        });
                    }
                    // calculate popup template
                    feature.popupTemplate = {
                        title: title,
                        content: _this._contentPopup(feature, fields),
                        actions: currentActions
                    };
                    console.log(operationLayerId + "/" + layerId + " [" + layerName + "] fieldset is configured");
                    return feature;
                });
                var results = identyfyFeaturesPopuped.filter(function (feature) {
                    return (feature != null);
                });
                return results;
            };
            return _this;
        }
        IdentifyResultsAppendPopupTemplates.prototype._contentPopup = function (feature, fields) {
            var attributes = feature.attributes;
            var info = "<table>";
            fields.forEach(function (item, index) {
                if (attributes[item]) {
                    if (['Null', 'NULL'].indexOf(attributes[item]) >= 0) {
                        attributes[item] = "н/д";
                    }
                    info += "<tr><td>" + item + "</td><td>" + attributes[item] + "</td></tr>";
                }
                else {
                    console.log("attribute [" + item + "] not found");
                }
            });
            info += "</table>";
            return info;
        };
        ;
        __decorate([
            decorators_1.property()
        ], IdentifyResultsAppendPopupTemplates.prototype, "actions", void 0);
        IdentifyResultsAppendPopupTemplates = __decorate([
            decorators_1.subclass('mvs.widgets.IdentifyResultsAppendPopupTemplates')
        ], IdentifyResultsAppendPopupTemplates);
        return IdentifyResultsAppendPopupTemplates;
    }(decorators_1.declared(Accessor)));
    return IdentifyResultsAppendPopupTemplates;
});
//# sourceMappingURL=IdentifyResultsAppendPopupTemplates.js.map
/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />
/// <amd-dependency path="dojo/topic" name="topic" />
/// <amd-dependency path="esri/widgets/Spinner" name="Spinner" />
/// <amd-dependency path="./identify/config" name="config" />
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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/topic", "esri/widgets/Spinner", "./identify/config", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/core/watchUtils", "esri/Graphic", "esri/core/Collection", "esri/support/actions/ActionButton", "./identify/IdentifyManyTasks", "./identify/IdentifyResultsAppendPopupTemplates", "widgets/rosreestr/customIdentify"], function (require, exports, __extends, __decorate, topic, Spinner, config, decorators_1, Accessor, watchUtils, Graphic, Collection, ActionButton_1, IdentifyManyTasks_1, IdentifyResultsAppendPopupTemplates_1, CustomIdentify) {
    "use strict";
    ActionButton_1 = __importDefault(ActionButton_1);
    IdentifyManyTasks_1 = __importDefault(IdentifyManyTasks_1);
    IdentifyResultsAppendPopupTemplates_1 = __importDefault(IdentifyResultsAppendPopupTemplates_1);
    var IdentifyModel = /** @class */ (function (_super) {
        __extends(IdentifyModel, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function IdentifyModel(properties) {
            var _this = _super.call(this) || this;
            _this.actions = new Collection();
            _this.customIdentify = new CustomIdentify({ operatingMode: "dependent" });
            _this._createSpinner = function () {
                _this.spinner = new Spinner({ view: _this.view });
                _this.view.ui.add(_this.spinner);
            };
            _this._createActionButtons = function () {
                config.actions.forEach(function (action) {
                    var actionButton = new ActionButton_1.default(action);
                    _this.actions.add(actionButton);
                });
            };
            _this._createListeners = function () {
                _this.view.on("click", _this._executeIdentifyTasks);
                _this.view.popup.watch("selectedFeature", _this._highlightFeature);
                watchUtils.whenFalse(_this.view.popup, "visible", _this._clearGraphic);
                // Fires each time an action is clicked
                _this.view.popup.on("trigger-action", _this._popupAction);
            };
            _this._popupAction = function (event) {
                var popupNode = _this.view.popup.container;
                var title = event.action.title; //let title = "Вывести статистику";
                // @ts-ignore
                var iconNode = popupNode.querySelector(".esri-popup__inline-actions-container > [title=\"" + title + "\"] > .esri-popup__icon");
                iconNode.style.color = 'red';
                var d = new Date();
                var n = ' ' + d.toLocaleTimeString();
                console.log("popup action -> " + event.action.id);
                var coords = _this._getcoords(iconNode);
                topic.publish("rocket/coords", coords);
                var message = {
                    body: event.action.title + n,
                    coords: coords
                };
                var topicId = event.action.id;
                topic.publish(topicId, message);
            };
            _this._executeIdentifyTasks = function (event) {
                // starting identify - locate spinner at click-point
                _this.spinner.show({ location: event.mapPoint });
                _this.dependent = _this.customIdentify.externalIdentification(event);
                var allTasks = new IdentifyManyTasks_1.default({ view: _this.view });
                _this.tasks = allTasks.tasks;
                allTasks.execute(event.mapPoint)
                    .then(_this._appendPopupInfo)
                    .then(_this._openPopup);
            };
            // _appendPopupInfo ------------------------------------------------------------------
            _this._appendPopupInfo = function (response) {
                var features = new IdentifyResultsAppendPopupTemplates_1.default().execute(response, _this.tasks, _this.actions);
                return features;
            };
            // _openPopup ------------------------------------------------------------------
            _this._openPopup = function (features) {
                // identify is ready - hide spinner
                _this.spinner.hide();
                var popupProperties = {
                    features: features.concat(_this.dependent),
                    updateLocationEnabled: false,
                    location: _this.spinner.location
                };
                if (popupProperties.features.length === 0) {
                    // @ts-ignore
                    popupProperties.title = "Ничего не найдено";
                }
                _this.view.popup.open(popupProperties);
            };
            _this._highlightFeature = function (feature) {
                if (feature) {
                    if (feature.attributes) {
                        if (feature.attributes.type) {
                            _this._clearGraphic();
                            _this.cadasteSelection.setSelection(feature.attributes);
                        }
                        else {
                            _this._clearGraphic();
                            var type = feature.geometry.type;
                            if (config.highlightSymbols.hasOwnProperty(type)) {
                                var symbol = config.highlightSymbols[type];
                                var highlightGraphic = new Graphic({
                                    geometry: feature.geometry,
                                    symbol: symbol
                                });
                                _this.view.graphics.add(highlightGraphic);
                            }
                        }
                    }
                }
            };
            _this._clearGraphic = function () {
                _this.view.graphics.removeAll();
                _this.cadasteSelection.setSelection({
                    type: "disable",
                    id: '4 = 5'
                });
            };
            _this.view = properties.view;
            _this._createSpinner();
            _this._createActionButtons();
            _this._createListeners();
            return _this;
        }
        IdentifyModel.prototype._getcoords = function (domNode) {
            var rect = domNode.getBoundingClientRect();
            var coords = {
                x: (rect.right + rect.left) / 2,
                y: (rect.top + rect.bottom) / 2,
                angel: 0
            };
            //console.log(rect.top, rect.right, rect.bottom, rect.left);            
            console.log(coords);
            return coords;
        };
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "spinner", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "tasks", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "actions", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "cadasteSelection", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "customIdentify", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyModel.prototype, "dependent", void 0);
        IdentifyModel = __decorate([
            decorators_1.subclass('mvs.widgets.IdentifyModel')
        ], IdentifyModel);
        return IdentifyModel;
    }(decorators_1.declared(Accessor)));
    return IdentifyModel;
});
//# sourceMappingURL=IdentifyModel.js.map
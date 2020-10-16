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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "./config", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/tasks/IdentifyTask", "esri/tasks/support/IdentifyParameters", "esri/core/promiseUtils"], function (require, exports, __extends, __decorate, config, decorators_1, Accessor, IdentifyTask, IdentifyParameters, promiseUtils) {
    "use strict";
    var IdentifyManyTasks = /** @class */ (function (_super) {
        __extends(IdentifyManyTasks, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function IdentifyManyTasks(properties) {
            var _this = _super.call(this) || this;
            _this._prepareIdentifyTasks = function () {
                var mapServices = _this.view.map.layers.filter(function (layer) {
                    return layer.visible && config.identifyServices[layer.id];
                });
                _this.tasks = mapServices.map(function (layer, i) {
                    // @ts-ignore
                    var task = new IdentifyTask(layer.url);
                    // @ts-ignore
                    task.operationLayerId = layer.id;
                    return task;
                });
            };
            _this.execute = function (location) {
                var params = _this._createIdentifyParams(location);
                var promises = _this.tasks.map(function (task, i) {
                    var promise = task.execute(params);
                    return promise;
                });
                var allTasksAreExecuted = promiseUtils.eachAlways(promises);
                return allTasksAreExecuted;
            };
            _this._createIdentifyParams = function (location) {
                var view = _this.view;
                var params = new IdentifyParameters(config.identifyParameters);
                params.width = view.width;
                params.height = view.height;
                params.mapExtent = view.extent;
                params.geometry = location;
                params.layerOption = 'visible';
                return params;
            };
            _this.view = properties.view;
            _this._prepareIdentifyTasks();
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], IdentifyManyTasks.prototype, "view", void 0);
        __decorate([
            decorators_1.property()
        ], IdentifyManyTasks.prototype, "tasks", void 0);
        IdentifyManyTasks = __decorate([
            decorators_1.subclass('mvs.widgets.IdentifyManyTasks')
        ], IdentifyManyTasks);
        return IdentifyManyTasks;
    }(decorators_1.declared(Accessor)));
    return IdentifyManyTasks;
});
//# sourceMappingURL=IdentifyManyTasks.js.map
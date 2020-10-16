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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/topic", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/tasks/QueryTask", "esri/tasks/support/RelationshipQuery"], function (require, exports, __extends, __decorate, topic, decorators_1, Widget_1, QueryTask, RelationshipQuery) {
    "use strict";
    Widget_1 = __importDefault(Widget_1);
    var RelationShipModal = /** @class */ (function (_super) {
        __extends(RelationShipModal, _super);
        function RelationShipModal(params) {
            var _this = _super.call(this, params) || this;
            _this.baseUrl = location.origin;
            return _this;
        }
        RelationShipModal.prototype.postInitialize = function () {
            var _this = this;
            topic.subscribe("input_relation", function (response) {
                _this._relationShip(response);
            });
        };
        RelationShipModal.prototype._relationShip = function (response) {
            var _this = this;
            var url = function () {
                if (response.type == "Проекты") {
                    return _this.baseUrl + "/gate/rest/services/test/projectCloudsRL/MapServer/7";
                }
                else if (response.type == "Строительство") {
                    return _this.baseUrl + "/gate/rest/services/test/buildCloudsRL/MapServer/7";
                }
            };
            var queryTask = new QueryTask({
                url: url()
            });
            var tablesNumberArray = [0, 1, 2, 3, 4, 5, 6];
            var tablesQuery = tablesNumberArray.map(function (number) {
                var query = new RelationshipQuery({
                    outFields: ["*"],
                    relationshipId: number,
                    objectIds: [response.feature.attributes.OBJECTID],
                    returnGeometry: true
                });
                return queryTask.executeRelationshipQuery(query);
            });
            Promise.all(tablesQuery).then(function (results) {
                var result = results.filter(function (item) {
                    return item[response.feature.attributes.OBJECTID] != undefined;
                });
                var objectsArray = result.map(function (item) {
                    return item[response.feature.attributes.OBJECTID].features;
                });
                topic.publish("output_relation", objectsArray);
            });
        };
        RelationShipModal = __decorate([
            decorators_1.subclass("esri.widgets.RelationShipModal")
        ], RelationShipModal);
        return RelationShipModal;
    }(decorators_1.declared(Widget_1.default)));
    return RelationShipModal;
});
//# sourceMappingURL=RelationShipModal.js.map
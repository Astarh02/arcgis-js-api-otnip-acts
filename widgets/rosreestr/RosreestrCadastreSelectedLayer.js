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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/layers/MapImageLayer", "esri/core/Accessor"], function (require, exports, __extends, __decorate, decorators_1, MapImageLayer, Accessor) {
    "use strict";
    var RosreestrCadastreSelectedLayer = /** @class */ (function (_super) {
        __extends(RosreestrCadastreSelectedLayer, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function RosreestrCadastreSelectedLayer(properties) {
            var _this = _super.call(this) || this;
            _this.setSelection = function (feature) {
                if (feature.type == 1) {
                    // земельные участки
                    _this.layer.findSublayerById(8).visible = true;
                    _this.layer.findSublayerById(8).definitionExpression = "id = '" + feature.attrs.id + "'";
                    _this.layer.findSublayerById(5).visible = false;
                    _this.layer.findSublayerById(5).definitionExpression = "4 = 5";
                }
                else if (feature.type == 5) {
                    // объекты капитального строительства
                    _this.layer.findSublayerById(5).visible = true;
                    _this.layer.findSublayerById(5).definitionExpression = "id = '" + feature.attrs.id + "'";
                    _this.layer.findSublayerById(8).visible = false;
                    _this.layer.findSublayerById(8).definitionExpression = "4 = 5";
                }
                else if (feature.type == "disable") {
                    _this.layer.findSublayerById(8).visible = false;
                    _this.layer.findSublayerById(8).definitionExpression = "" + feature.id;
                    _this.layer.findSublayerById(5).visible = false;
                    _this.layer.findSublayerById(5).definitionExpression = "" + feature.id;
                }
                console.log(feature);
            };
            _this.layer = new MapImageLayer({
                title: "выбранный кадастр",
                url: "https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/CadastreSelected/MapServer",
                opacity: 0.5,
                visible: true,
                sublayers: [
                    {
                        id: 5,
                        title: "ОКС",
                        visible: false,
                        definitionExpression: "4=5"
                    },
                    {
                        id: 8,
                        title: "Участки",
                        visible: false,
                        definitionExpression: "4=5"
                    }
                ]
            });
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], RosreestrCadastreSelectedLayer.prototype, "layer", void 0);
        RosreestrCadastreSelectedLayer = __decorate([
            decorators_1.subclass('mvs.widgets.RosreestrSearchSource')
        ], RosreestrCadastreSelectedLayer);
        return RosreestrCadastreSelectedLayer;
    }(decorators_1.declared(Accessor)));
    return RosreestrCadastreSelectedLayer;
});
//# sourceMappingURL=RosreestrCadastreSelectedLayer.js.map
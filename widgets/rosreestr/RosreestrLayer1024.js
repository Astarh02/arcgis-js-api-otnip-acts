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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "esri/core/accessorSupport/decorators", "esri/layers/BaseTileLayer"], function (require, exports, __extends, __decorate, decorators_1, BaseTileLayer) {
    "use strict";
    var RosreestrLayer1024 = /** @class */ (function (_super) {
        __extends(RosreestrLayer1024, _super);
        // --------------------------------------------------------------------------
        //  Constructor
        // --------------------------------------------------------------------------
        function RosreestrLayer1024(properties) {
            var _this = _super.call(this) || this;
            _this.getTileUrl = function (level, row, col) {
                var bbox = _this.getTileBounds(level, row, col);
                var x1 = bbox[0];
                var y1 = bbox[1];
                var x2 = bbox[2];
                var y2 = bbox[3];
                return _this.urlTemplate
                    .replace("{x1}", x1.toString())
                    .replace("{x2}", x2.toString())
                    .replace("{y1}", y1.toString())
                    .replace("{y2}", y2.toString());
            };
            _this.tileInfo.size = [1024, 1024];
            _this.title = "кадастровое деление";
            _this.urlTemplate = "https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/Cadastre/MapServer/export?bbox={x1}%2C{y1}}%2C{x2}%2C{y2}&bboxSR=102100&imageSR=102100&size=1024%2C1024&dpi=96&format=png32&transparent=true&f=image";
            return _this;
        }
        __decorate([
            decorators_1.property()
        ], RosreestrLayer1024.prototype, "urlTemplate", void 0);
        RosreestrLayer1024 = __decorate([
            decorators_1.subclass('mvs.widgets.RosreestrLayer1024')
        ], RosreestrLayer1024);
        return RosreestrLayer1024;
    }(decorators_1.declared(BaseTileLayer)));
    return RosreestrLayer1024;
});
//# sourceMappingURL=RosreestrLayer1024.js.map
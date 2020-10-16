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
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "widgets/rosreestr/configKosmos", "esri/core/accessorSupport/decorators", "esri/PopupTemplate"], function (require, exports, __extends, __decorate, Config, decorators_1, PopupTemplate) {
    "use strict";
    var TableConverter = /** @class */ (function (_super) {
        __extends(TableConverter, _super);
        function TableConverter(properties) {
            return _super.call(this) || this;
        }
        /**
         * convert
         */
        TableConverter.prototype.convert = function (graphic, feature, id) {
            var results = [];
            if (id == 5) {
                results.push({ name: "Кадастровый номер", value: feature["attrs"]['cn'] });
                results.push({ name: "Адрес", value: feature["attrs"]['address'] });
                results.push({ name: "Тип", value: Config.tableSettings.oks_type[feature["attrs"]['oks_type']] });
                results.push({ name: "Статус", value: Config.tableSettings.statecd[feature["attrs"]['statecd']] });
                results.push({ name: "Наименование", value: feature["attrs"]['name'] });
                results.push({ name: "Форма собственности", value: Config.tableSettings.fp[feature["attrs"]['fp']] });
                results.push({ name: "Кадастровая стоимость", value: feature["attrs"]['cad_cost'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['cad_unit']] });
                results.push({ name: Config.tableSettings.area_type[feature["attrs"]['area_type']], value: feature["attrs"]['area_value'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['area_unit']] });
                results.push({ name: "Назначение", value: Config.tableSettings.oksPurpose[feature["attrs"]['purpose']] });
                if (feature["attrs"]["ci_surname"]) {
                    results.push({ name: "Кадастровый инженер", value: feature["attrs"]['ci_surname'] + " " + feature["attrs"]['ci_first'] + " " + feature["attrs"]['ci_patronymic'] });
                }
                else {
                    results.push({ name: "Кадастровый инженер", value: feature["attrs"]['co_name'] });
                }
                results.push({ name: "Дата постановки на учет", value: feature["attrs"]['date_create'] });
                results.push({ name: "Дата изменения сведений в ГКН", value: feature["attrs"]['cad_record_date'] });
                results.push({ name: "Дата выгрузки сведений из ГКН", value: feature["attrs"]['adate'] });
            }
            if (id == 1) {
                results.push({ name: "Кадастровый номер", value: feature["attrs"]['cn'] });
                results.push({ name: "Адрес", value: feature["attrs"]['address'] });
                results.push({ name: "Тип", value: "Земельный участок" });
                results.push({ name: "Статус", value: Config.tableSettings.statecd[feature["attrs"]['statecd']] });
                results.push({ name: "Категория земель", value: Config.tableSettings.category_type[feature["attrs"]['category_type']] });
                results.push({ name: "Форма собственности", value: Config.tableSettings.fp[feature["attrs"]['fp']] });
                results.push({ name: "Кадастровая стоимость", value: feature["attrs"]['cad_cost'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['cad_unit']] });
                results.push({ name: Config.tableSettings.area_type[feature["attrs"]['area_type']], value: feature["attrs"]['area_value'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['area_unit']] });
                results.push({ name: "Разрешенное использование", value: Config.tableSettings.util_code[feature["attrs"]['util_code']] });
                results.push({ name: "по документу", value: feature["attrs"]['util_by_doc'] });
                if (feature["attrs"]["ci_surname"]) {
                    results.push({ name: "Кадастровый инженер", value: feature["attrs"]['ci_surname'] + " " + feature["attrs"]['ci_first'] + " " + feature["attrs"]['ci_patronymic'] });
                }
                else {
                    results.push({ name: "Кадастровый инженер", value: feature["attrs"]['co_name'] });
                }
                results.push({ name: "Дата постановки на учет", value: feature["attrs"]['date_create'] });
                results.push({ name: "Дата изменения сведений в ГКН", value: feature["attrs"]['cad_record_date'] });
                results.push({ name: "Дата выгрузки сведений из ГКН", value: feature["attrs"]['adate'] });
            }
            var table = "<table>";
            results.forEach(function (element) {
                if (element.name != undefined) {
                    if (element.value == undefined || element.value == "undefined undefined") {
                        table += "<tr><td>" + element.name + "</td><td>-</td></tr>";
                    }
                    else if (element.value) {
                        table += "<tr><td>" + element.name + "</td><td>" + element.value + "</td></tr>";
                    }
                }
            });
            table += "</table>";
            graphic.popupTemplate = new PopupTemplate({
                // title : feature["attrs"]["cn"],
                content: table
            });
            if (id == 1) {
                graphic.popupTemplate.title = feature["attrs"]["cn"] + " - Участки";
            }
            if (id == 5) {
                graphic.popupTemplate.title = feature["attrs"]["cn"] + " - ОКС";
            }
            return graphic;
        };
        TableConverter = __decorate([
            decorators_1.subclass('mvs.widgets.TableConverter')
        ], TableConverter);
        return TableConverter;
    }(decorators_1.declared(PopupTemplate)));
    return TableConverter;
});
//# sourceMappingURL=TableConverter.js.map
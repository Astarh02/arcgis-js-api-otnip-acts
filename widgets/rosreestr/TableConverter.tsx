/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />

/// <amd-dependency path='widgets/rosreestr/configKosmos' name='Config' />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import PopupTemplate = require ("esri/PopupTemplate");

import Graphic = require("esri/Graphic");

declare const Config : any;

@subclass('mvs.widgets.TableConverter')
class TableConverter extends declared(PopupTemplate) {
    constructor(properties?: any) {
        super();
    }

    /**
     * convert
     */
    public convert(graphic : Graphic, feature : object, id : number) {
        let results = [];

        if (id == 5){
            results.push({name:"Кадастровый номер", value:feature["attrs"]['cn']});
            results.push({name:"Адрес", value:feature["attrs"]['address']});
            results.push({name:"Тип", value:Config.tableSettings.oks_type[feature["attrs"]['oks_type']]});
            results.push({name:"Статус", value:Config.tableSettings.statecd[feature["attrs"]['statecd']]});
            results.push({name:"Наименование", value:feature["attrs"]['name']});
            results.push({name:"Форма собственности", value:Config.tableSettings.fp[feature["attrs"]['fp']]});
            results.push({name:"Кадастровая стоимость", value:feature["attrs"]['cad_cost'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['cad_unit']]});
            results.push({name:Config.tableSettings.area_type[feature["attrs"]['area_type']], value:feature["attrs"]['area_value'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['area_unit']]});
            results.push({name:"Назначение", value:Config.tableSettings.oksPurpose[feature["attrs"]['purpose']]});
            if (feature["attrs"]["ci_surname"]){
              results.push({name:"Кадастровый инженер", value:feature["attrs"]['ci_surname'] + " " + feature["attrs"]['ci_first'] + " " + feature["attrs"]['ci_patronymic']});
            }else {
              results.push({name:"Кадастровый инженер",value:feature["attrs"]['co_name']});
            }
            results.push({name:"Дата постановки на учет", value:feature["attrs"]['date_create']});
            results.push({name:"Дата изменения сведений в ГКН", value:feature["attrs"]['cad_record_date']});
            results.push({name:"Дата выгрузки сведений из ГКН", value:feature["attrs"]['adate']});
        }
  
        if (id == 1){
            results.push({name:"Кадастровый номер", value:feature["attrs"]['cn']});
            results.push({name:"Адрес", value:feature["attrs"]['address']});
            results.push({name:"Тип", value:"Земельный участок"});
            results.push({name:"Статус", value:Config.tableSettings.statecd[feature["attrs"]['statecd']]});
            results.push({name:"Категория земель", value:Config.tableSettings.category_type[feature["attrs"]['category_type']]});
            results.push({name:"Форма собственности", value:Config.tableSettings.fp[feature["attrs"]['fp']]});
            results.push({name:"Кадастровая стоимость", value:feature["attrs"]['cad_cost'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['cad_unit']]});
            results.push({name:Config.tableSettings.area_type[feature["attrs"]['area_type']], value:feature["attrs"]['area_value'] + " " + Config.tableSettings.measurementUnits[feature["attrs"]['area_unit']]});
            results.push({name:"Разрешенное использование", value:Config.tableSettings.util_code[feature["attrs"]['util_code']]});
            results.push({name:"по документу", value:feature["attrs"]['util_by_doc']});
            if (feature["attrs"]["ci_surname"]){
              results.push({name:"Кадастровый инженер", value:feature["attrs"]['ci_surname'] + " " + feature["attrs"]['ci_first'] + " " + feature["attrs"]['ci_patronymic']});
            }else {
              results.push({name:"Кадастровый инженер",value:feature["attrs"]['co_name']});
            }
            results.push({name:"Дата постановки на учет", value:feature["attrs"]['date_create']});
            results.push({name:"Дата изменения сведений в ГКН", value:feature["attrs"]['cad_record_date']});
            results.push({name:"Дата выгрузки сведений из ГКН", value:feature["attrs"]['adate']});
        }

        let table = "<table>";
        results.forEach( (element:any) => {
            if (element.name != undefined) {
                if (element.value == undefined || element.value == "undefined undefined") {table += `<tr><td>${element.name}</td><td>-</td></tr>`} else
                if (element.value) {table += `<tr><td>${element.name}</td><td>${element.value}</td></tr>`}
            }
        })
        table += "</table>"
        graphic.popupTemplate = new PopupTemplate({
            // title : feature["attrs"]["cn"],
            content : table
        });
        if (id == 1) {graphic.popupTemplate.title = feature["attrs"]["cn"] + " - Участки"}
        if (id == 5) {graphic.popupTemplate.title = feature["attrs"]["cn"] + " - ОКС"}
        return graphic;
    }
}
export = TableConverter
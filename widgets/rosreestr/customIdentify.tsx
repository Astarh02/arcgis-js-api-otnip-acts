/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />

/// <amd-dependency path="esri/widgets/Spinner" name="Spiner" />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import Widget from "esri/widgets/Widget";

import MapView = require ("esri/views/MapView");

import Graphic = require ("esri/Graphic");

import Polygon = require ("esri/geometry/Polygon");

import Point = require ("esri/geometry/Point");

import Popup = require ("esri/widgets/Popup");

import TableConverter = require ('widgets/rosreestr/TableConverter');

import RosreestrCadastreSelectedLayer = require ('widgets/rosreestr/RosreestrCadastreSelectedLayer');

declare const Spiner:any;

@subclass('mvs.widgets.customIdentify')
class customIdentify extends declared(Widget) {
    autoCast : any;
    constructor(properties?: any) {
        super();
    }

    @property()
    cadasteSelection: RosreestrCadastreSelectedLayer;

    @property()
    view : MapView;

    @property()
    spiner : any;

    @property()
    operatingMode : any = "autonomic" || "dependent";
    
    postInitialize() {
        if (this.operatingMode == "autonomic") {this.autoCast = this.view.on("click", (event) => {this.logic(event)})} else
        if (this.operatingMode == "dependent") {this.autoCast = null}
    }

    private logic(event:any) {
        let layers = [1, 5]
        let allResults:Array<any> = [];

        this.spiner = new Spiner({
            view : this.view
        })
        this.view.ui.add(this.spiner);
        this.spiner.show({
            location : event.mapPoint
        });
        this.view.popup.autoOpenEnabled = false;
        
        layers.forEach( (number) => {
            let url = `https://pkk.rosreestr.ru/api/features/${number}?text=${event.mapPoint.latitude}+${event.mapPoint.longitude}`
            let xml = new XMLHttpRequest();
            xml.open("GET", url, false);
            xml.send();
            let results = JSON.parse(xml.responseText);

            let resultsFeature = results.features.map( (feature:any) => {
                let urlFeature = `https://pkk.rosreestr.ru/api/features/${number}/${feature.attrs.id}`;
                let xmlFeature = new XMLHttpRequest();
                xmlFeature.open("GET", urlFeature, false);
                xmlFeature.send();
                let resultFeature = JSON.parse(xmlFeature.responseText);

                var graphic = new Graphic({
                    geometry: new Polygon({
                        rings: [
                          [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymin],
                          [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymin],
                          [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymax],
                          [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymax],
                        ],
                        spatialReference : {
                        wkid : 102100
                        },
                    }),
                    attributes: feature
                });
                this.cadasteSelection.setSelection(feature);
                let graphPopup = new TableConverter().convert(graphic, resultFeature.feature, number);
                return graphPopup;
            });
            allResults = allResults.concat(resultsFeature);
        })
        
        this.spiner.hide();
        if (allResults.length == 0) {
            return this.view.popup.open({
                location : event.mapPoint,
                title : "Ничего не найдено",
                content : "В данной точке на карте нет объектов идентификации."
            });
        }
        if (allResults[0].geometry) {
            this.view.popup.location = allResults[0].geometry.extent.center
        } else {
            this.view.popup.location = new Point({
                x : allResults[0].attributes.center.x,
                y : allResults[0].attributes.center.y,
                spatialReference : {
                    wkid : 102100
                },
            })
        }

        this.view.popup.open({
            fetchFeatures : true,
            features : allResults,
            location : allResults[0].geometry.extent.center
        });
        this.view.goTo(allResults[0]);
        this.cadasteSelection.setSelection(allResults[0].attributes);

        this.view.popup.watch("selectedFeature", (object) => {
            this.cadasteSelection.setSelection(object.attributes);
            // this.view.popup.location = object.geometry.centroid
        })
        this.view.popup.watch("visible", (visible) => {
            if (!visible) {
                this.cadasteSelection.setSelection({
                    type : "disable",
                    id : '4 = 5'
                });
            }
        })
    }

    /**
     * externalIdentification
     */
    public externalIdentification(event:any) {
        let layers = [1, 5]
        let allResults:Array<any> = [];
        
        layers.forEach( (number) => {
            let url = `https://pkk.rosreestr.ru/api/features/${number}?text=${event.mapPoint.latitude}+${event.mapPoint.longitude}`
            let xml = new XMLHttpRequest();
            xml.open("GET", url, false);
            xml.send();
            let results = JSON.parse(xml.responseText);

            let resultsFeature = results.features.map( (feature:any) => {
                let urlFeature = `https://pkk.rosreestr.ru/api/features/${number}/${feature.attrs.id}`;
                let xmlFeature = new XMLHttpRequest();
                xmlFeature.open("GET", urlFeature, false);
                xmlFeature.send();
                let resultFeature = JSON.parse(xmlFeature.responseText);

                var graphic = new Graphic({
                    geometry: new Polygon({
                        rings: [
                            [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymin],
                            [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymin],
                            [resultFeature.feature.extent.xmax, resultFeature.feature.extent.ymax],
                            [resultFeature.feature.extent.xmin, resultFeature.feature.extent.ymax],
                        ],
                        spatialReference : {
                            wkid : 102100
                        },
                    }),
                    attributes: feature
                });
                let graphPopup = new TableConverter().convert(graphic, resultFeature.feature, number);
                return graphPopup;
            });
            allResults = allResults.concat(resultsFeature);
        });
        return allResults;
    }
}
export = customIdentify;
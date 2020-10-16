/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import SearchSource = require("esri/widgets/Search/SearchSource");
import esriRequest = require("esri/request");
import Graphic = require("esri/Graphic" );
import Polygon = require ("esri/geometry/Polygon");
import Point = require("esri/geometry/Point" );
import Extent = require("esri/geometry/Extent");
import RosreestrCadastreSelectedLayer = require('widgets/rosreestr/RosreestrCadastreSelectedLayer');
import TableConverter = require('widgets/rosreestr/TableConverter');
import MapView = require("esri/views/MapView");


@subclass('mvs.widgets.RosreestrSearchSource')
class RosreestrSearchSource extends declared(SearchSource) {

    @property()
    suggestionsUrl: string;

    @property()
    resultsUrl: string;

    @property()
    cadasteSelection: RosreestrCadastreSelectedLayer;

    @property()
    tableConverter : TableConverter = new TableConverter();

    @property()
    view : MapView;

  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------

  constructor(properties?: any) {
       super();   
  }

  public getSuggestions = (params:any) : any => {
    return esriRequest(this.suggestionsUrl, {
      query: {
        text: params.suggestTerm 
      },
      responseType: "json"
    }).then((response) => {
      return response.data.results.map( (item:any, i:number) => {
        return {
            key : i,
            text : item.title,
            sourceIndex : params.sourceIndex
        }
      });
    });
  }


  // УЧАСТОК = 77:08:0002010:26
  // ОКС = 77:08:0002010:1002
  public getResults = (params:any) : any => {
    return esriRequest(this.resultsUrl, {
      query: {
        text: params.suggestResult.text.replace(/ /g, "+"),
        limit:40,
        skip:0   
      },
      responseType: "json"
    })
    .then((response) => {
      console.log(response);
      return response.data.features.map( (feature:any, i:number) => {
        var graphic = new Graphic({
            geometry: new Polygon({
                rings: [
                  [feature.extent.xmin, feature.extent.ymin],
                  [feature.extent.xmax, feature.extent.ymin],
                  [feature.extent.xmax, feature.extent.ymax],
                  [feature.extent.xmin, feature.extent.ymax],
                ],
                spatialReference : {
                wkid : 102100
                },
            }),
            attributes: feature
        });
        feature.extent.spatialReference =  {
          wkid : 102100
        }
        let xml = new XMLHttpRequest();
            xml.open("GET", `${this.resultsUrl}/${feature.attrs.id}`, false);
            xml.send();
        let XMLresult = JSON.parse(xml.responseText);
        let graphPopup = this.tableConverter.convert(graphic, XMLresult.feature, feature.type);

        this.cadasteSelection.setSelection(feature);

        this.view.popup.autoOpenEnabled = false;
        this.view.popup.open({
            fetchFeatures : true,
            features : [graphPopup],
            location : graphic.geometry.extent.center
        });

        // this.view.popup.watch("visible", (visible) => {
        //     if (!visible) {
        //         this.cadasteSelection.setSelection({
        //             type : "disable",
        //             id : '4 = 5'
        //         });
        //     }
        // })

        this.view.goTo(graphPopup);

      });
    });
  }

}

export = RosreestrSearchSource;
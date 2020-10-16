/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import MapImageLayer = require("esri/layers/MapImageLayer");
import Accessor = require("esri/core/Accessor");


@subclass('mvs.widgets.RosreestrSearchSource')
class RosreestrCadastreSelectedLayer extends declared(Accessor) {

  @property()
  layer: MapImageLayer;


  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------

  constructor(properties?: any) {
       super();
        this.layer = new MapImageLayer ({
          title: "выбранный кадастр",
          url: "https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/CadastreSelected/MapServer",
          opacity: 0.5,
          visible : true,
          sublayers: [
              {
                  id : 5,
                  title : "ОКС",
                  visible : false,
                  definitionExpression : "4=5"
              },
              {
                  id : 8,
                  title : "Участки",
                  visible : false,
                  definitionExpression : "4=5"
              }
          ]
      });
  }

  public setSelection = (feature:any) : any => {
    if (feature.type == 1) {
      // земельные участки
      this.layer.findSublayerById(8).visible = true;
      this.layer.findSublayerById(8).definitionExpression = `id = '${feature.attrs.id}'`
      this.layer.findSublayerById(5).visible = false;
      this.layer.findSublayerById(5).definitionExpression = `4 = 5`
    } else if (feature.type == 5) {
      // объекты капитального строительства
      this.layer.findSublayerById(5).visible = true;
      this.layer.findSublayerById(5).definitionExpression = `id = '${feature.attrs.id}'`
      this.layer.findSublayerById(8).visible = false;
      this.layer.findSublayerById(8).definitionExpression = `4 = 5`
    } else if (feature.type == "disable") {
        this.layer.findSublayerById(8).visible = false;
        this.layer.findSublayerById(8).definitionExpression = `${feature.id}`
        this.layer.findSublayerById(5).visible = false;
        this.layer.findSublayerById(5).definitionExpression = `${feature.id}`
    }
    console.log(feature);
  }
}

export = RosreestrCadastreSelectedLayer;
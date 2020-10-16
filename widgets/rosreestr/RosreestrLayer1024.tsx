/// <amd-dependency path='esri/core/tsSupport/declareExtendsHelper' name='__extends' />
/// <amd-dependency path='esri/core/tsSupport/decorateHelper' name='__decorate' />

import {declared, property, subclass} from "esri/core/accessorSupport/decorators";

import BaseTileLayer = require("esri/layers/BaseTileLayer");

@subclass('mvs.widgets.RosreestrLayer1024')
class RosreestrLayer1024 extends declared(BaseTileLayer) {


    @property()
    urlTemplate: string;

  // --------------------------------------------------------------------------
  //  Constructor
  // --------------------------------------------------------------------------

  constructor(properties?: any) {
       super();
       this.tileInfo.size = [1024,1024];
       this.title = "кадастровое деление";
       this.urlTemplate = "https://pkk.rosreestr.ru/arcgis/rest/services/PKK6/Cadastre/MapServer/export?bbox={x1}%2C{y1}}%2C{x2}%2C{y2}&bboxSR=102100&imageSR=102100&size=1024%2C1024&dpi=96&format=png32&transparent=true&f=image";
  }

  public getTileUrl = (level:number, row:number, col:number) => {

    let bbox = this.getTileBounds(level, row, col);
    let x1 = bbox[0];
    let y1 = bbox[1];
    let x2 = bbox[2];
    let y2 = bbox[3];   

    return this.urlTemplate
      .replace("{x1}", x1.toString())
      .replace("{x2}", x2.toString())
      .replace("{y1}", y1.toString())
      .replace("{y2}", y2.toString());
  }
}

export = RosreestrLayer1024;
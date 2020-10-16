/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
/// <amd-dependency path="dojo/topic" name="topic" />

import { subclass, declared, property, aliasOf } from "esri/core/accessorSupport/decorators";

import Widget from "esri/widgets/Widget";

import { renderable, tsx } from "esri/widgets/support/widget";

import QueryTask = require("esri/tasks/QueryTask");

import RelationshipQuery = require("esri/tasks/support/RelationshipQuery");

declare const topic : any;

@subclass("esri.widgets.RelationShipModal")
class RelationShipModal extends declared(Widget) {
    constructor(params?: any) {
        super(params);
    }
    private topic : string;
    private baseUrl = location.origin;

    postInitialize() {
        topic.subscribe("input_relation", (response:any) => {
            this._relationShip(response)
        })
    }

    private _relationShip(response:any) {
        let url = () => {
            if (response.type == "Проекты") {
                return this.baseUrl + "/gate/rest/services/test/projectCloudsRL/MapServer/7"
            } else if (response.type == "Строительство") {
                return this.baseUrl + "/gate/rest/services/test/buildCloudsRL/MapServer/7"
            }
        }
        var queryTask = new QueryTask({
            url: url()
        });

        let tablesNumberArray = [0,1,2,3,4,5,6];
        let tablesQuery = tablesNumberArray.map( (number) => {
            const query = new RelationshipQuery({
                outFields: ["*"],
                relationshipId: number,
                objectIds: [response.feature.attributes.OBJECTID],
                returnGeometry : true
            });
            return queryTask.executeRelationshipQuery(query)
        })
        Promise.all(tablesQuery).then(function (results:any) {
            let result = results.filter( (item:any) => {
                return item[response.feature.attributes.OBJECTID] != undefined
            })
            let objectsArray = result.map( (item:any) => {
                return item[response.feature.attributes.OBJECTID].features
            })
            topic.publish("output_relation", objectsArray)
        })
    }
}
export = RelationShipModal;
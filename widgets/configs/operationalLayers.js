define(function(){
    var operationalLayers = 
    [
      {id:'setimvs', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setimvs/MapServer/', title:'ГУП Мосводосток эксплуатируемые'},
                {id:'setinodata', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setinodata/MapServer/', title:'Сети без данных'},
                {id:'setibuild', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setibuild/MapServer/', title:'Строящиеся сети'},
                {id:'setiothers', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setiothers/MapServer/', title:'Сети сторонних организаций'},
              {id:'setiold', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setiold/MapServer/', title:'Ликвидированные сети'},
                {id:'setiunfinished', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setiunfinished/MapServer/', title:'Недооформленные сети'},
      {id:'setiproject', url: 'http://atlas.mvs.int/arcgis/rest/services/wgs/setiproject/MapServer/', title:'Проектируемые сети'}
    ];
	return operationalLayers;		
})
# arcgis-js-api-kosmos

Назначение приложения - совмещение данных по сетям МВС с "Космоснимками" и "данными Росреестра".

Перечень реализуемых функций:
* отображение космоснимков в качестве подложки
* совмещение системы координат сетей МВС (московская СК) с системой координат космоснимков
* отображение слоя "кадастровое деление" с сайта ПКК
* поиск Участков и ОКС по кадастровому номер
* "идентифай" по Участкам и ОКС
* подсветка выбранного Участка или ОКС на карте

## отображение слоя "кадастровое деление" с сайта ПКК (виджет RosreestrLayer1024)

Create a custom tile layer: https://developers.arcgis.com/javascript/latest/sample-code/layers-custom-tilelayer/index.html

## поиск Участков и ОКС по кадастровому номер

Search widget with custom source: https://developers.arcgis.com/javascript/latest/sample-code/widgets-search-customsource/index.html
/*global angular*/
/*global Highcharts*/
/*global google*/
/*global FusionCharts*/

"use strict"
angular
    .module("tvfeesManagerApp")
    .controller("transfersmain-ctrl", ["$scope", "$http", function($scope, $http) {



        console.log("main Controller initialized");

        $http.get("/api/v1/transferincomes-stats").then(function(response) {
            console.log((response.data));

            /*Highcharts*/

            Highcharts.chart('analytics2', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'My Stadistics'
                },
                subtitle: {
                    text: 'Source: Transfers-stats'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d["team"] })
                },
                yAxis: {
                    title: {
                        text: 'INCOMES'
                    }
                },
                plotOptions: {
                    line: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                },
                series: [{
                    name: 'TiMaxExp',
                    data: response.data.map(function(d) { return d["timaxexp"] })
                }, {
                    name: 'TiLessExp',
                    data: response.data.map(function(d) { return d["tilessexp"] })
                }, {
                    name: 'TiSpa',
                    data: response.data.map(function(d) { return d["tispa"] })
                }]
            });




        });


        /*Geocharts*/
        $http.get("/api/v1/transferincomes-stats").then(function(response) {
            console.log((response.data));
            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable([
                    ['City', 'PassRate'],
                    ['Malaga', 'malaga-fc'],
                    ['Sevilla', 'sevilla-fc'],
                    ['Villareal', 'villareal-cf'],
                    ['Madrid', 'realmadrid-fc'],
                    ['Madrid', 'atleticomadrid-fc'],
                    ['Barcelona', 'barcelona-fc'],
                    ['Vigo', 'celtavigo-cf']
                ]);

                var options = {
                    region: 'ES',
                    colorAxis: { colors: ['#00853f', 'green', '#e31b23'] },
                    displayMode: 'markers',
                    colorAxis: { colors: ['red', 'grey', 'black', 'orange'] }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('transfers'));

                chart.draw(data, options);
            }

        });



        /*Awesome*/

        $http.get("/api/v1/transferincomes-stats").then(function(response) {
            console.log((response.data));
            
            FusionCharts.ready(function () {
    var topStores = new FusionCharts({
        type: 'bar2d',
        renderAt: 'chart-container',
        width: '400',
        height: '300',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Transfers",
                "subCaption": "Temporada 2015/16",
                "yAxisName": "Millones(€)",
                "numberPrefix": "€",
                "paletteColors": "#0075c2",
                "bgColor": "#ffffff",
                "showBorder": "0",
                "showCanvasBorder": "0",
                "usePlotGradientColor": "0",
                "plotBorderAlpha": "10",
                "placeValuesInside": "1",
                "valueFontColor": "#ffffff",
                "showAxisLines": "1",
                "axisLineAlpha": "25",
                "divLineAlpha": "10",
                "alignCaptionWithCanvas": "0",
                "showAlternateVGridColor": "0",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "toolTipColor": "#ffffff",
                "toolTipBorderThickness": "0",
                "toolTipBgColor": "#000000",
                "toolTipBgAlpha": "80",
                "toolTipBorderRadius": "2",
                "toolTipPadding": "5"
            },
            
            "data": [
                {
                    "label": "Real Madrid FC",
                    "value": "49.5"
                }, 
                {
                    "label": "Celta de Vigo",
                    "value": "29.3"
                }, 
                {
                    "label": " FC Barcelona ",
                    "value": "68"
                }, 
                {
                    "label": "Malaga CF",
                    "value": "7"
                }, 
                {
                    "label": "Sevilla FC",
                    "value": "13.75"
                }
            ]
        }
    })
    .render();
});

        });

    }]);

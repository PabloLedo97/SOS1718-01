/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
/*global uv*/
"use strict"
angular.module("tvfeesManagerApp")
    .controller("apisCompartidasGoalsCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var apiPropia = "/api/v1/goals-stats"
        var api2 = "proxyPACO/api/v1/unemployment-rates";
        var api1 = "https://sos1718-02.herokuapp.com/api/v2/employments";
        var api3 = "https://sos1718-08.herokuapp.com/api/v2/students-an";

        var mashapeES = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/alpha/es",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL",
                "Accept": "application/json"
            }
        };
        var mashapeRu = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/alpha/ru",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL",
                "Accept": "application/json"
            }
        };

        var mashapeEbola = {
            method: 'GET',
            url: "https://ebola-outbreak.p.mashape.com/cases",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL",
                "Accept": "application/jsosn"
            }
        };

        var mashapeHello = {
            method: 'GET',
            url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=hello",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL",
                "Accept": "application/json"
            }
        };
        var mashapeBye = {
            method: 'GET',
            url: "https://mashape-community-urban-dictionary.p.mashape.com/define?term=bye",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL",
                "Accept": "application/json"
            }
        };



        $http.get(api1).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {
                Highcharts.chart('GraficoNormal', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: ' GraficoNormal '
                    },

                    xAxis: {
                        categories: response2.data.map(function(d) { return (parseInt(d.year)) })
                    },
                    yAxis: {
                        title: {
                            text: 'Stats1'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                            marker: {
                                radius: 4,
                                lineColor: '#666666',
                                lineWidth: 1
                            }
                        }
                    },
                    series: [{
                        name: 'Rightfoot',
                        data: response2.data.map(function(d) { return d["rightfoot"] })
                    }, {
                        name: 'Head',
                        data: response2.data.map(function(d) { return d["head"] })
                    }, {

                        name: 'TotalSelf',
                        data: response1.data.map(function(d) { return (parseFloat(d["totalself"])) })

                    }, {
                        name: 'TotalSalaried',
                        data: response1.data.map(function(d) { return (parseFloat(d["totalsalaried"])) })


                    }]
                });
            });
        });



        $http.get(api2).then(function(response1) {
            $http.get(apiPropia).then(function(response2) {

                anychart.onDocumentReady(function() {

                    // create data
                    var data = [
                        ["Goles pierna derecha", response2.data.map(function(d) { return d["rightfoot"] }).reduce(function(a, n) { return a + n })],
                        ["Goles de cabeza", response2.data.map(function(d) { return d["head"] }).reduce(function(a, n) { return a + n })],
                        ["illiterate", response1.data.map(function(d) { return d["illiterate"] }).reduce(function(a, n) { return a + n })],
                        ["First-Grade", response1.data.map(function(d) { return d["first-grade"] }).reduce(function(a, n) { return a + n })]
                    ];

                    var chart = anychart.funnel(data);

                    // set the container id
                    chart.container("GraficoProxy");

                    // initiate drawing the chart
                    chart.draw();
                });
                /*
              Highcharts.chart('GraficoProxy', {
                  
    chart: {
        type: 'column'
    },
    title: {
        text: 'GraficoProxy'
    },
    
    xAxis: {
        categories: response1.data.map(function(d){return (parseInt(d.year))}),
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
           
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{   name: 'Rightfoot',
        data: response2.data.map(function(d){return d["rightfoot"]})
    },{
        name: 'Head',
        data: response2.data.map(function(d){return (parseInt(d["head"]))})
    },{
        name: 'Illiterate',
        data: response1.data.map(function(d){return (parseInt(d["illiterate"]))})
    },{
        name: 'First-Grade',
        data: response1.data.map(function(d){return (parseInt(d["first-grade"]))})
        
    }]
}); */
            });
        });

        var url = 'https://openweathermap.org/data/2.5/weather?q=';
        var id = '&appid=b6907d289e10d714a6e88b30761fae22';


        $http.get(url + 'Malaga' + ',ES' + id).then(function(response) {
            $http.get(url + 'Sevilla' + ',ES' + id).then(function(response1) {
                $http.get(url + 'Bilbao' + ',ES' + id).then(function(response3) {
                    $http.get(apiPropia).then(function(response2) {
                        console.log((response.data));



                        var graphdef = {
                            categories: ['Malaga', 'Sevilla', 'Bilbao'],
                            dataset: {
                                'Malaga': [
                                    { name: 'temperatura', value: response.data['main']['temp'] },
                                    { name: 'goles de penalty', value: response2.data.filter(d => d.city == "malaga").map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n }) }
                                ],
                                'Sevilla': [
                                    { name: 'temperatura', value: response1.data['main']['temp'] },
                                    { name: 'goles de penalty', value: response2.data.filter(d => d.city == "sevilla").map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n }) }
                                ],
                                'Bilbao': [
                                    { name: 'temperatura', value: response3.data['main']['temp'] },
                                    { name: 'goles de penalty', value: response2.data.filter(d => d.city == "bilbao").map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n }) }
                                ]
                            }
                        };
                        var config = {};

                        var charObject = uv.chart('Bar', graphdef);

                    });
                });
            });
        });

        $http(mashapeES).then(function(response) {
            $http(mashapeRu).then(function(response2) {
                $http.get(apiPropia).then(function(response3) {
                    console.log(response.data);
                    console.log(response2.data);
                    var data = [
                        { name: 'numero de fronteras ESPAÑA', value: response.data.borders.length },
                        { name: 'Numero de fronteras RUSIA', value: response2.data.borders.length },

                        { name: 'Goles de penalty', value: response3.data.map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n }) },

                    ];

                    // create funnel chart
                    var chart = anychart.pyramid(data);

                    // set chart margin
                    chart.margin(10, '20%', 10, '20%');

                    // set chart legend settings
                    chart.legend()
                        .enabled(true)
                        .position('outside-right')
                        .itemsLayout('vertical')
                        .align('top');

                    // set chart title
                    // set chart base width settings
                    chart.baseWidth('70%');

                    // set chart labels settings
                    chart.labels()
                        .position('outside-right')
                        .format('{%Value}');

                    // set container id for the chart
                    chart.container('sharedStadistics1');

                    // initiate chart drawing
                    chart.draw();




                });
            });
        });


        $http(mashapeEbola).then(function(response) {
            $http.get(apiPropia).then(function(response2) {
                console.log(response.data);
                console.log(response2.data);

                FusionCharts.ready(function() {
                    var salesChart = new FusionCharts({
                            type: 'area2d',
                            renderAt: 'ApiExterna3',
                            width: '400',
                            height: '300',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": "Estadisticas del ébola y goles",
                                    "xAxisName": "Estadisticas",
                                    "yAxisName": "Unidades",
                                    "paletteColors": "#0075c2",
                                    "bgColor": "#ffffff",
                                    "showBorder": "0",
                                    "showCanvasBorder": "0",
                                    "plotBorderAlpha": "10",
                                    "usePlotGradientColor": "0",
                                    "plotFillAlpha": "50",
                                    "showXAxisLine": "1",
                                    "axisLineAlpha": "25",
                                    "divLineAlpha": "10",
                                    "showValues": "1",
                                    "showAlternateHGridColor": "0",
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

                                "data": [{
                                        "label": "Muertes ebola Marzo-2014",
                                        "value": response.data.map(function(d) { return d["deaths"] })[0]
                                    },
                                    {
                                        "label": "Muertes ebola Abril-2014",
                                        "value": response.data.map(function(d) { return d["deaths"] })[4]
                                    },
                                    {
                                        "label": "Muertes ebola Mayo-2014",
                                        "value": response.data.map(function(d) { return d["deaths"] })[9]
                                    },
                                    {
                                        "label": "Goles pierna derecha",
                                        "value": response2.data.map(function(d) { return d["rightfoot"] }).reduce(function(a, n) { return a + n })
                                    },
                                    {
                                        "label": "Goles de cabeza",
                                        "value": response2.data.map(function(d) { return d["head"] }).reduce(function(a, n) { return a + n })
                                    }
                                ]
                            }
                        })
                        .render();
                });
            });
        });


        $http.get(api3).then(function(response) {
            $http.get(apiPropia).then(function(response2) {
                console.log(response.data);
                console.log(response2.data);

                FusionCharts.ready(function() {
                    var ageGroupChart = new FusionCharts({
                        type: 'pie2d',
                        renderAt: 'ApiExterna4',
                        width: '450',
                        height: '300',
                        dataFormat: 'json',
                        dataSource: {
                            "chart": {
                                "caption": "Educación y goles en Sevilla",
                                "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000",
                                "bgColor": "#ffffff",
                                "showBorder": "0",
                                "use3DLighting": "0",
                                "showShadow": "0",
                                "enableSmartLabels": "0",
                                "startingAngle": "0",
                                "showPercentValues": "1",
                                "showPercentInTooltip": "0",
                                "decimals": "1",
                                "captionFontSize": "14",
                                "subcaptionFontSize": "14",
                                "subcaptionFontBold": "0",
                                "toolTipColor": "#ffffff",
                                "toolTipBorderThickness": "0",
                                "toolTipBgColor": "#000000",
                                "toolTipBgAlpha": "80",
                                "toolTipBorderRadius": "2",
                                "toolTipPadding": "5",
                                "showHoverEffect": "1",
                                "showLegend": "1",
                                "legendBgColor": "#ffffff",
                                "legendBorderAlpha": '0',
                                "legendShadow": '0',
                                "legendItemFontSize": '10',
                                "legendItemFontColor": '#666666'
                            },
                            "data": [{
                                    "label": "Goles pierna derecha provincia Sevilla",
                                    "value": response2.data.filter(d => d.city == "sevilla").map(function(d) { return d["rightfoot"] }).reduce(function(a, n) { return a + n })
                                },
                                {
                                    "label": "Goles cabeza provincia Sevilla",
                                    "value": response2.data.filter(d => d.city == "sevilla").map(function(d) { return d["head"] }).reduce(function(a, n) { return a + n })
                                },
                                {
                                    "label": "Analfabetos Sevilla",
                                    "value": response.data.filter(d => d.province == "sevilla").map(function(d) { return d["popilliterate"] }).reduce(function(a, n) { return a + n })
                                },
                                {
                                    "label": "Alta educación Sevilla",
                                    "value": response.data.filter(d => d.province == "sevilla").map(function(d) { return d["pophigheducation"] }).reduce(function(a, n) { return a + n })
                                }
                            ]
                        }
                    }).render();
                });


            });
        });

        $http(mashapeHello).then(function(response) {
            $http.get(apiPropia).then(function(response2) {
                $http(mashapeBye).then(function(response3) {
                    console.log(response.data);
                    console.log(response3.data);
                    console.log(response2.data);


                    AmCharts.makeChart("chartdiv", {
                        "type": "serial",
                        "categoryField": "category",
                        "autoMarginOffset": 40,
                        "marginRight": 60,
                        "marginTop": 60,
                        "startDuration": 1,
                        "fontSize": 13,
                        "theme": "patterns",
                        "categoryAxis": {
                            "gridPosition": "start"
                        },
                        "trendLines": [],
                        "graphs": [{
                            "balloonText": "[[title]] of [[category]]:[[value]]",
                            "bullet": "round",
                            "bulletSize": 10,
                            "id": "AmGraph-1",
                            "lineAlpha": 1,
                            "lineThickness": 3,
                            "type": "smoothedLine",
                            "valueField": "column-1"
                        }],
                        "guides": [],
                        "valueAxes": [{
                            "id": "ValueAxis-1",
                            "title": ""
                        }],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [],
                        "dataProvider": [{
                                "category": "Formas Hello",
                                "column-1": response.data.tags.length

                            },
                            {
                                "category": "Formas Bye",
                                "column-1": response3.data.tags.length
                            },
                            {
                                "category": "Goles de penalty Sevilla FC",
                                "column-1": response2.data.filter(d => d.team == "sevilla-fc").map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n })
                                
                            },
                            {
                                "category": "Goles de penalty Malaga CF",
                                "column-1": response2.data.filter(d => d.team == "malaga-fc").map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n })
                            }
                        ]
                    });

                });
            });

        });

    }]);

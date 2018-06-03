"use strict"
/*global angular*/
/*global Highcharts*/
/*global zingchart*/
/*global AmCharts*/
/*global FusionCharts*/
angular.module("tvfeesManagerApp")
    .controller("apisCompartidasTvfeesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var miApi = "/api/v1/tvfees-stats";
        var apiprox = "proxyPablo/api/v1/attacks-data";
        var apicors = "https://sos1718-08.herokuapp.com/api/v2/crimes-an";

        $http.get(apicors).then(function(response10) {
            $http.get(miApi).then(function(response20) {

                Highcharts.chart('graficaApi1', {
                    chart: {
                        type: 'scatter'
                    },
                    title: {
                        text: 'My Stadistics'
                    },
                    subtitle: {
                        text: ''
                    },
                    xAxis: {
                        categories: response10.data.map(function(d) { return d["province"] }),
                        title: {
                            text: null
                        }
                    },
                    yAxis: {
                        min: 0.5,
                        title: {
                            text: 'Stadistics',
                            align: 'high'
                        },
                        labels: {
                            overflow: 'justify'
                        }
                    },
                    tooltip: {
                        valueSuffix: ' millions'
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
                    series: [{
                        name: 'Capacity',
                        data: response20.data.map(function(d) { return d["capacity"] })
                    }, {
                        name: 'Attotal',
                        data: response20.data.map(function(d) { return d["attotal"] })
                    }, {
                        name: 'OneCrime',
                        data: [21000, 25000, 30000, 34000, 12000]
                    }, {
                        name: 'twoCrime',
                        data: [15000, 15000, 22000, 24000, 10000]
                    }]
                });



            });
        });
        $http.get(apiprox).then(function(response10) {
            $http.get(miApi).then(function(response20) {

                Highcharts.chart('graficaApi2', {
                    chart: {
                        type: 'bar'
                    },
                    title: {
                        text: 'Stadistics '
                    },
                    subtitle: {
                        text: 'My stadistics'
                    },
                    xAxis: {
                        categories: response20.data.map(function(d) { return d["team"] }),
                        tickmarkPlacement: 'on',
                        title: {
                            enabled: false
                        }
                    },
                    yAxis: {
                        title: {
                            text: 'Millions'
                        },
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        }
                    },
                    tooltip: {
                        split: true,
                        valueSuffix: ' millions'
                    },
                    plotOptions: {
                        area: {
                            stacking: 'normal',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        }
                    },
                    series: [{
                        name: 'Capacity',
                        data: response20.data.map(function(d) { return d["capacity"] })
                    }, {
                        name: 'Attotal',
                        data: response20.data.map(function(d) { return d["attotal"] })
                    }, {
                        name: 'Ataverage',
                        data: response20.data.map(function(d) { return d["ataverage"] })
                    }, {
                        name: 'Killed',
                        data: response10.data.map(function(d) { return d["killed"]*10000})
                    }, {
                        name: 'Injured',
                        data: response10.data.map(function(d) { return d["injured"]*10000 })
                    }]
                });



            });
        });
 //==============APIs Externas========================
//Api externa nº1 Integracion 
var goals = {
            method: 'GET',
            url:"https://montanaflynn-fifa-world-cup.p.mashape.com/goals",
            headers: {
               "X-Mashape-Key": "0uC0eKCfqkmsh8caooJtABP2PuXVp1Vxp36jsnZXumtItm27QN",
               "Accept": "application/json"
               

            }
        };
 $http(goals).then(function(response1) {
  $http.get(miApi).then(function(response2) {
       console.log(response1.data);
       console.log(response2.data);
       var data = [
           { value: response1.data[0].team_id,
             value: response1.data[1].team_id,
             value:response1.data[2].team_id,
             value:response1.data[3].team_id,
             value:response1.data[4].team_id,
             value:response1.data[0].minute,
             value:response1.data[1].minute,
             value:response1.data[2].minute,
             value:response1.data[3].minute,
             value:response1.data[4].minute,
            },
            ];

                        var myChart = {
  "type": "area",
  "title": {
    "text": "Stadistics Api Externa Nº1"
  },
  "plot": {
    "value-box": {
      "text": "%v"
    },
    "tooltip": {
      "text": "50%v"
    }
  },
  "legend": {
    "toggle-action": "hide",
    "header": {
      "text": "Legend Header"
    },
    "item": {
      "cursor": "pointer"
    },
    "draggable": true,
    "drag-handler": "icon"
  },
  "scale-x": {
    "values": [2015,2016,2017,2018,2019],
            
    
  },
  "series": [
    {
      "values": 
      [response1.data[0].minute,
            response1.data[1].minute,
            response1.data[2].minute,
            response1.data[3].minute,
            response1.data[4].minute,
           ],
     "text": "minutos"
           
    },
    {
      "values": 
      [response1.data[0].team_id,
            response1.data[1].team_id,
            response1.data[2].team_id,
            response1.data[3].team_id,
            response1.data[4].team_id,
           ],
     "text": "team_id"
           
    },
    
    {
        "values":[response2.data[0].attotal/100000,
            response2.data[1].attotal/100000,
            response2.data[2].attotal/100000,
            response2.data[3].attotal/100000,
            response2.data[4].attotal/100000,
        ],
         "text": "attotal"
    
        
    }
    
   
                         
  ]
};
zingchart.render({
  id: "myChart",
  data: myChart,
  height: "480",
  width: "100%"
});
      


});
});
//Api externa nº2 Uso  widget Integrado con Api 

          
        
  $http.get("https://swapi.co/api/starships/").then(function(response) {
  $http.get(miApi).then(function(response2) {
      console.log(response.data);
       var datos = response.data.results;
     var r=[];
    console.log(datos[0].length);
    console.log(response2.data[0].capacity/10000);
    
    datos.map(function(d){
      r.push({
     "name":d.name,
     "value":  d.length,
    
    });
    });
  var myChart1 = {
  "type": "radar",
  "title": {
    "text": "Stadistics Api Externa Nº2"
  },
  "plot": {
    "value-box": {
      "text": "%v"
    },
    "tooltip": {
      "text": "50%v"
    }
  },
  "legend": {
    "toggle-action": "hide",
    "header": {
      "text": "Legend Header"
    },
    "item": {
      "cursor": "pointer"
    },
    "draggable": true,
    "drag-handler": "icon"
  },
  "scale-x": {
    "values": [10000,150000,200000]
            
    
  },
  "series": [
    
    {
         "values": [datos[0].length,
            datos[1].length,
           datos[2].length,
            datos[3].length,
            datos[4].length,
           ],
      "text": "length"
    
        
    },
    {
    "values":[response2.data[0].capacity/10000,
            response2.data[1].capacity/10000,
            response2.data[2].capacity/10000,
            response2.data[3].capacity/10000,
            response2.data[4].capacity/10000,
        ],
        "text": "capacity"
    
    }
                         
  ]
};
zingchart.render({
  id: "myChart1",
  data: myChart1,
  height: "480",
  width: "100%"
});

      
    });
    
});

 $http.get("https://sos1718-08.herokuapp.com/api/v2/crimes-an").then(function(response1) {
 $http.get(miApi).then(function(response3) {


FusionCharts.ready(function() {
                    var salesChart = new FusionCharts({
                            type: 'line',
                            renderAt: 'chart-container',
                            width: '400',
                            height: '300',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": " Api Externa Nº3: Estadisticas de la asistencia media  al estadio y Los años",
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
                                        "label": "Año 1",
                                        "value":response1.data[0].year
                                    },
                                    {
                                        "label": "Año 2",
                                        "value":response1.data[1].year
                                    },
                                    {
                                        "label": "Asistencia media Camp Nou",
                                        "value": response3.data[0].ataverage
                                    },
                                    {
                                        "label": "Asistencia media San Mames",
                                        "value": response3.data[1].ataverage
                                    },
                                    {
                                        "label": "Asistencia media Santiago Bernabeu",
                                        "value": response3.data[2].ataverage
                                    }
                                ]
                            }
                        })
                        .render();  
  
});
    
 });
 });
      
  $http.get("https://sos1718-10.herokuapp.com/api/v1/buses").then(function(response) {
  $http.get(miApi).then(function(response3) {
       FusionCharts.ready(function() {
                    var salesChart = new FusionCharts({
                            type: 'pyramid',
                            renderAt: 'chart-container2',
                            width: '400',
                            height: '300',
                            dataFormat: 'json',
                            dataSource: {
                                "chart": {
                                    "caption": " Api Externa Nº3: Estadisticas de la asistencia media  al estadio y El transporte de personas en autobus",
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
                                        "label": "Esperanza de vida especie 1",
                                        "value":response.data[0].transportedTraveler
                                    },
                                    {
                                        "label": "Esperanza de vida especie 2",
                                        "value":response.data[1].transportedTraveler
                                    },
                                    {
                                        "label": "Asistencia media Camp Nou",
                                        "value": response3.data[0].ataverage
                                    },
                                    {
                                        "label": "Asistencia media San Mames",
                                        "value": response3.data[1].ataverage
                                    },
                                    {
                                        "label": "Asistencia media Santiago Bernabeu",
                                        "value": response3.data[2].ataverage
                                    }
                                ]
                            }
                        })
                        .render();  
  
});
    });
    
});    
   
    }]);

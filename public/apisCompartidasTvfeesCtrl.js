"use strict"
/*global angular*/
/*global Highcharts*/
angular.module("tvfeesManagerApp")
    .controller("apisCompartidasTvfeesCtrl", ["$scope", "$http", function($scope, $http) {
        console.log("List Ctrl initialized!");
        var miApi = "/api/v1/tvfees-stats";
        var apiprox = "proxyPablo/api/v1/attacks-data";
        var apicors = "http://sos1718-08.herokuapp.com/api/v2/crimes-an";

        $http.get(apicors).then(function(response10) {
            $http.get(miApi).then(function(response20) {
                var colors = Highcharts.getOptions().colors;
Highcharts.chart('graficaApi1', {

    chart: {
        type: 'streamgraph',
        marginBottom: 30,
        zoomType: 'x'
    },

    // Make sure connected countries have similar colors
    colors: [
        colors[0],
        colors[1],
        colors[2],
        colors[3],
        colors[4],
        
        Highcharts.color(colors[5]).brighten(0.2).get(),
        Highcharts.color(colors[5]).brighten(0.1).get(),

        colors[5],
        colors[6],
        colors[7],
        colors[8],
        colors[9],
        colors[0],
        colors[1],
        colors[3],
       
        Highcharts.color(colors[2]).brighten(-0.1).get(),
        Highcharts.color(colors[2]).brighten(-0.2).get(),
        Highcharts.color(colors[2]).brighten(-0.3).get()
    ],

    title: {
        floating: true,
        align: 'left',
        text: 'Stadistics'
    },
    subtitle: {
        floating: true,
        align: 'left',
        y: 30,
        
    },

    xAxis: {
        maxPadding: 0,
        type: 'category',
        crosshair: true,
        categories: [
            response10.data.map(function(d) { return d["province"] }),
            response20.data.map(function(d) { return d["team"] })
              
            
        ],
        labels: {
            align: 'left',
            reserveSpace: false,
            rotation: 270
        },
        lineWidth: 0,
        margin: 20,
        tickWidth: 0
    },

    yAxis: {
        visible: false,
        startOnTick: false,
        endOnTick: false
    },

    legend: {
        enabled: false
    },

    annotations: [{
        labels: [{
            point: {
                x: 5.5,
                xAxis: 0,
                y: 30,
                yAxis: 0
            },
            text: 'Stadistics'
        }, {
            point: {
                x: 18,
                xAxis: 0,
                y: 90,
                yAxis: 0
            },
            text: 'Stadistics'
        }],
        labelOptions: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'silver'
        }
    }],

    plotOptions: {
        series: {
            label: {
                minFontSize: 5,
                maxFontSize: 15,
                style: {
                    color: 'rgba(255,255,255,0.75)'
                }
            }
        }
    },

    series: [{
        "name": response10.data.map(function(d) { return d["province"] }),
        "data": [
           response10.data.map(function(d) { return d["capacity"] }),
           response10.data.map(function(d) { return d["attotal"] }),
           response10.data.map(function(d) { return d["team"] }),
           response10.data.map(function(d) { return d["onecrime"] }),
           response10.data.map(function(d) { return d["twocrime"] }),
           response10.data.map(function(d) { return d["threecrime"] })
        ]
    }],

    exporting: {
        sourceWidth: 800,
        sourceHeight: 600
    }

});

               
            });
        });
          $http.get(apiprox).then(function(response10) {
            $http.get(miApi).then(function(response20) {
                
Highcharts.chart('graficaApi2', {
    chart: {
        type: 'area'
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
            formatter: function () {
                return this.value ;
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
        data: response10.data.map(function(d) { return d["killed"] })
    }, {
        name: 'Injured',
        data: response10.data.map(function(d) { return d["injured"] })
    }]
});
                
                
                
            });
        });

    }]);

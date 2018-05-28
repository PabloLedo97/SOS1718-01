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
               
Highcharts.chart('graficaApi1', {
    chart: {
        type: 'column'
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
        data: [21000,25000,30000,34000,12000]
    }, {
        name: 'twoCrime',
        data: [15000,15000,22000,24000,10000]
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

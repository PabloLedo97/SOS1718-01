/*global angular*/
/*global Highcharts*/
/*global google*/
"use strict"
angular
    .module("tvfeesManagerApp")
    .controller("tvfeesmain-ctrl", ["$scope", "$http", function($scope, $http) {



        console.log("main Controller initialized");

        $http.get("/api/v1/tvfees-stats").then(function(response) {
            console.log((response.data));

            /*Highcharts*/

            Highcharts.chart('analytics', {
                chart: {
                    type: 'line'
                },
                title: {
                    text: 'My Stadistics'
                },
                subtitle: {
                    text: 'Source:tvfees-stats'
                },
                xAxis: {
                    categories: response.data.map(function(d) { return d["team"] })
                },
                yAxis: {
                    title: {
                        text: 'Temperature (°C)'
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
                    name: 'Capacity',
                    data: response.data.map(function(d) { return d["capacity"] })
                }, {
                    name: 'Attotal',
                    data: response.data.map(function(d) { return d["attotal"] })
                }, {
                    name: 'Ataverage',
                    data: response.data.map(function(d) { return d["ataverage"] })
                }]
            });




        });
     
            /*Geocharts*/
 $http.get("/api/v1/tvfees-stats").then(function(response) {
            console.log((response.data));
                  google.charts.load('current', {
        'packages':['geochart'],
        // Note: you will need to get a mapsApiKey for your project.
        // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);

      function drawRegionsMap() {
        var data = google.visualization.arrayToDataTable([
          ['City','PassRate'],
          ['Barcelona','fc-barcelona'],
          ['Bilbao','athletic-club-de-bilbao'],
          ['Madrid','club-atletico-de-madrid'],
          ['Madrid2','real-madrid-cf'],
          ['Valencia','valencia-cf'],
          ['Sevilla','real-betis']
        ]);

        var options = {
            region: 'ES',
            colorAxis: {colors: ['#00853f', 'green', '#e31b23']},
        displayMode: 'markers',
        colorAxis: {colors: ['red','grey','black', 'orange']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('tvfees'));

        chart.draw(data, options);
      }

 });   

        $http.get("/api/v1/tvfees-stats").then(function(response) {
            console.log((response.data));

            /*Graphosurus*/

        });
    }]);

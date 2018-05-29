/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/
"use strict"
angular
    .module("tvfeesManagerApp")
    .controller("goalsmain-ctrl", ["$scope", "$http", function($scope, $http) {



        console.log("main Controller initialized");

        $http.get("/api/v1/goals-stats").then(function(response) {
            $http.get("/api/v1/transferincomes-stats").then(function(response2) {
                $http.get("/api/v1/tvfees-stats").then(function(response3) {
                    console.log((response.data));



                    Highcharts.chart('analytics1', {
                        chart: {
                            type: 'spline'
                        },
                        title: {
                            text: 'All Stadistics'
                        },
                        subtitle: {
                            text: 'Source: ALL-stats'
                        },
                        xAxis: {
                            categories: response.data.map(function(d) { return d["team"] })
                        },
                        yAxis: {
                            title: {
                                text: 'Estadísticas'
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
                                name: 'Rightfoot',
                                data: response.data.map(function(d) { return d["rightfoot"] })
                            }, {
                                name: 'Head',
                                data: response.data.map(function(d) { return d["head"] })
                            }, {
                                name: 'Penalty',
                                data: response.data.map(function(d) { return d["penalty"] })
                            }
                        ]
                    });


                });
            });

        });



        $http.get("/api/v1/goals-stats").then(function(response) {
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
                    ['City', 'Team'],
                    [response.data[0].city, response.data[0].team],
                    [response.data[1].city, response.data[1].team],
                    [response.data[2].city, response.data[2].team],
                    [response.data[3].city, response.data[3].team],
                    [response.data[4].city, response.data[4].team],

                ]);

                var options = {
                    region: 'ES',
                    colorAxis: { colors: ['#00853f', 'green', '#e31b23'] },
                    displayMode: 'markers',
                    colorAxis: { colors: ['red', 'grey', 'black', 'orange'] }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('goals'));

                chart.draw(data, options);
            }

        });

        $http.get("/api/v1/goals-stats").then(function(response) {
            console.log((response.data));


            var graphdef = {
                categories: ['Goles'],
                dataset: {
                    'Goles': [
                        { name: 'rightfoot', value: response.data.map(function(d) { return d["rightfoot"] }).reduce(function(a, n) { return a + n }) },
                        { name: 'head', value: response.data.map(function(d) { return d["head"] }).reduce(function(a, n) { return a + n }) },
                        { name: 'penalty', value: response.data.map(function(d) { return d["penalty"] }).reduce(function(a, n) { return a + n }) }
                    ],

                }
            };

            var config = {};

            var charObject = uv.chart('donut', graphdef);


        });
        /*  
    function getTiempo (ciudad){
      
      var url = 'https://openweathermap.org/data/2.5/weather?q=';
      var id = '&appid=b6907d289e10d714a6e88b30761fae22';
      var res = null;
      
      $http.get(url + ciudad + ',ES' + id).then(function(response) {
            console.log((response.data));
        res = response.data['main']['temp'];
        
      });
      
      
      return res;
      
 
}


var graphdef = {
  categories : ['Madrid'],
  dataset : {
    'Madrid' : [
      { name : 'rightfoot', value: getTiempo('Madrid')}
      
    ]
  }
};

      var config = {};

      var charObject = uv.chart('Bar', graphdef);


        */


    }]);

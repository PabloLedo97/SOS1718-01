/*global angular*/
/*global Highcharts*/
/*global google*/
"use strict"
angular
  .module("tvfeesManagerApp")
  .controller("goalsmain-ctrl", ["$scope", "$http", function($scope, $http) {
      
        

    console.log("main Controller initialized");
    
 $http.get("/api/v1/goals-stats").then(function(response){ 
     console.log((response.data));
  
 /*Highcharts*/ 
  
Highcharts.chart('analytics1', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'My Stadistics'
    },
    subtitle: {
        text: 'Source: Goals-stats'
    },
    xAxis: {
        categories: response.data.map(function(d){return d["team"]})
    },
    yAxis: {
        title: {
            text: 'GOALS'
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
        data: response.data.map(function(d){return d["rightfoot"]})
    },{name: 'Head',
        data: response.data.map(function(d){return d["head"]})
    },{
        name: 'Penalty',
        data: response.data.map(function(d){return d["penalty"]})
    }]
});
  
  
  
  
 });
  
   
       /*Geocharts*/
 $http.get("/api/v1/goals-stats").then(function(response) {
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
          ['Malaga','malaga-fc'],
          ['Sevilla','sevilla-fc'],
          ['Sevilla2','real-betis-balompie'],
          ['Bilbao','athletic-club-bilbao'],
          ['Villareal','villareal-cf'],
          ['Madrid','realmadrid-fc']
        ]);

        var options = {
            region: 'ES',
            colorAxis: {colors: ['#00853f', 'green', '#e31b23']},
        displayMode: 'markers',
        colorAxis: {colors: ['red','grey','black', 'orange']}
        };

        var chart = new google.visualization.GeoChart(document.getElementById('goals'));

        chart.draw(data, options);
      }

 });   

        $http.get("/api/v1/goals-stats").then(function(response) {
            console.log((response.data));

            /*Graphosurus*/

        });
  }]); 
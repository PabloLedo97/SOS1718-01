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
  
  }]);   
    /*Geochart*/
    /*
    $http.get("api/v1/tvfees-stats").then(function(response){
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
          ['Barcelona',parseInt(response.data.filter(d=>d.city=='barcelona')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
          ['Bilbao',parseInt(response.data.filter(d=>d.city=='bilbao')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
           ['Madrid',parseInt(response.data.filter(d=>d.city=='madrid')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
          ['Madrid',parseInt(response.data.filter(d=>d.city=='madrid')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
          ['Valencia',parseInt(response.data.filter(d=>d.city=='valencia')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
          ['Sevilla',parseInt(response.data.filter(d=>d.city=='sevilla')
          .map(function(d){ return (parseInt(d["year"])+parseInt(d["capacity"])+parseInt(d["attotal"])+parseInt(d["ataverage"]))
          }))],
        ]);

        var options = {
            region: 'ES',
             displayMode: 'markers',
             colorAxis: {colors: ['#00853f', 'green', '#e31b23']},
        };

        var chart = new google.visualization.GeoChart(document.getElementById('analytics'));

        chart.draw(data, options);
      }
      
      
      
     
      




      
      
      
      
 
      
    });
    
   */ 


  
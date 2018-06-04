/*global angular*/
/*global Highcharts*/
/*global google*/
/*global am4charts*/
/*global am4core*/
/* global am4themes_animated*/
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
          ['Sevilla','real-betis'],
         
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

            /*amChart.js*/

 
 

am4core.useTheme(am4themes_animated);

var data = [{
	
    "team":response.data.map(function(d) { return d["team"] }) ,
    "pie": [{
		"value": response.data.map(function(d) { return d["capacity"] }),
		"title": "capacity"
	}, {
		"value": response.data.map(function(d) { return d["attotal"] }),
		"title": "attotal"
	}, {
		"value": response.data.map(function(d) { return d["ataverage"] }),
		"title": "ataverage"
	}]
    

}];


// Create chart instance
var chart = am4core.create("chartdiv", am4charts.XYChart);

// Add data
chart.data = response.data;

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "team";
categoryAxis.renderer.grid.template.disabled = true;

var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Stadistics";
valueAxis.min = 0;
valueAxis.renderer.baseGrid.disabled = true;
valueAxis.renderer.grid.template.strokeOpacity = 0.07;

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "capacity";
series.dataFields.categoryX = "team";
series.tooltip.pointerOrientation = "vertical";


var columnTemplate = series.columns.template;
// add tooltip on column, not template, so that slices could also have tooltip
columnTemplate.column.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
columnTemplate.column.tooltipY = 0;
columnTemplate.column.cornerRadiusTopLeft = 20;
columnTemplate.column.cornerRadiusTopRight = 20;
columnTemplate.strokeOpacity = 0;


// as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
columnTemplate.adapter.add("fill", (fill, target) => {	
	var color = chart.colors.getIndex(target.dataItem.index * 3);
	return color;
});

// create pie chart as a column child
var pieChart = series.columns.template.createChild(am4charts.PieChart);
pieChart.width = am4core.percent(80);
pieChart.height = am4core.percent(80);
pieChart.align = "center";
pieChart.valign = "middle";
pieChart.dataFields.data = "pie";

var pieSeries = pieChart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "title";
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;
pieSeries.slices.template.stroke = am4core.color("#ffffff");
pieSeries.slices.template.strokeWidth = 1;
pieSeries.slices.template.strokeOpacity = 0;

pieSeries.slices.template.adapter.add("fill", (fill, target)=>{
  return am4core.color("#ffffff")
});

pieSeries.slices.template.adapter.add("fillOpacity", (fillOpacity, target)=>{
  return (target.dataItem.index + 1) * 0.2;
});

pieSeries.hiddenState.properties.startAngle = -90;
pieSeries.hiddenState.properties.endAngle = 270;
        });
    }]);

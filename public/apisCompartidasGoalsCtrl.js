/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("tvfeesManagerApp")
  .controller("apisCompartidasGoalsCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/goals-stats"
            var api2 = "proxyPACO/api/v1/unemployment-rates";
            var api1 = "http://sos1718-02.herokuapp.com/api/v2/employments";
            
            
            $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('GraficoNormal', {
    chart: {
        type: 'line'
    },
    title: {
        text: ' GraficoNormal '
    },
    
    xAxis: {
        categories: response2.data.map(function(d){return (parseInt(d.year))})
    },
    yAxis: {
        title: {
            text: 'Stats1'
        },
        labels: {
            formatter: function () {
                return this.value ;
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
        data: response2.data.map(function(d){return d["rightfoot"]})
    },{
        name: 'Head',
        data: response2.data.map(function(d){return d["head"]})
    },{
        
        name: 'TotalSelf',
        data: response1.data.map(function(d){return (parseFloat(d.totalself))})
        
    },{
        name: 'TotalSalaried',
        data: response1.data.map(function(d){return (parseFloat(d.totalsalaried))})
        
       
    }]
});
});
        });
        
       
        
         $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('GraficoProxy', {
    chart: {
        type: 'bar'
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
});
        });
        });
           
}]);

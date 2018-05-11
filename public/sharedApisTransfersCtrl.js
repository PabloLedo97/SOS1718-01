/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
"use strict"
angular.module("tvfeesManagerApp")
  .controller("sharedApisTransfersCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/transferincomes-stats"
            var api2 = "proxyMANU/api/v1/span-univ-stats";
            var api1 = "https://sos1718-04.herokuapp.com/api/v2/graduation-rates";
            
            
            $http.get(api1).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('sharedStadistics1', {
    chart: {
        type: 'area'
    },
    title: {
        text: ' sharedStadistics1 '
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
         name: 'TiMaxExp',
        data: response2.data.map(function(d){return d["timaxexp"]})
    },{
        name: 'TiLessExp',
        data: response2.data.map(function(d){return d["tilessexp"]})
    },{
        
        name: 'PublicSchool',
        data: response1.data.map(function(d){return (parseFloat(d["public-school"]))})
        
    },{
        name: 'PrivateSchool',
        data: response1.data.map(function(d){return (parseFloat(d["private-school"]))})
        
       
    }]
});
});
        });
        
       
        
         $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('sharedStadistics2', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'sharedStadistics2'
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
    series: [{   name: 'TiMaxExp',
        data: response2.data.map(function(d){return d["timaxexp"]})
    },{
        name: 'TiLessExp',
        data: response2.data.map(function(d){return (parseInt(d["tilessexp"]))})
    },{
        name: 'Degree',
        data: response1.data.map(function(d){return (parseInt(d["degree"]))})
    },{
        name: 'Master',
        data: response1.data.map(function(d){return (parseInt(d["master"]))})
        
    }]
});
        });
        });
           
}]);

/*global angular*/
/*global Highcharts*/
/*global google*/
/*global Morris*/
/*global uv*/
"use strict"
angular.module("tvfeesManagerApp")
  .controller("apisCompartidasGoalsCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var apiPropia = "/api/v1/goals-stats"
            var api2 = "proxyPACO/api/v1/unemployment-rates";
            var api1 = "https://sos1718-02.herokuapp.com/api/v2/employments";
            
            var mashapeES = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/alpha/es",
            headers: {
                "X-Mashape-Key": "zZRDXYaRzImsher3Auyq9KGGeUUmp1bONedjsnLtL2XyhpTlsL", 
                "Accept": "application/json"
            }};
            var mashapeRu = {
            method: 'GET',
            url: "https://restcountries-v1.p.mashape.com/alpha/ru",
            headers: {
                "X-Mashape-Key": "AcgEvL97rJmshaCOKvsl1gQsAywip1HIPLejsnt0pcuMEW5zzk", 
                "Accept": "application/json"
            }};
            
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
        data: response1.data.map(function(d){return (parseFloat(d["totalself"]))})
        
    },{
        name: 'TotalSalaried',
        data: response1.data.map(function(d){return (parseFloat(d["totalsalaried"]))})
        
       
    }]
});
});
        });
        
       
        
         $http.get(api2).then(function(response1){
                $http.get(apiPropia).then(function(response2){
              Highcharts.chart('GraficoProxy', {
    chart: {
        type: 'pie'
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
        
       var url = 'https://openweathermap.org/data/2.5/weather?q=';
      var id = '&appid=b6907d289e10d714a6e88b30761fae22';
      
      
      $http.get(url + 'Malaga' + ',ES' + id).then(function(response) {
          $http.get(url + 'Sevilla' + ',ES' + id).then(function(response1) {
              $http.get(url + 'Bilbao' + ',ES' + id).then(function(response3) {
          $http.get(apiPropia).then(function(response2){
            console.log((response.data));
        
        
        
        var graphdef = {
  categories : ['Malaga','Sevilla','Bilbao'],
  dataset : {
    'Malaga' : [
      { name : 'temperatura', value:response.data['main']['temp'] },
      { name : 'goles de penalty', value: response2.data.filter(d=>d.city=="malaga").map(function(d){return d["penalty"]}).reduce(function(a,n){return a+n}) }
    ],
    'Sevilla' : [
      { name : 'temperatura', value: response1.data['main']['temp'] },
      { name : 'goles de penalty', value: response2.data.filter(d=>d.city=="sevilla").map(function(d){return d["penalty"]}).reduce(function(a,n){return a+n}) }
    ],
    'Bilbao' : [
      { name : 'temperatura', value:response3.data['main']['temp'] },
      { name : 'goles de penalty', value: response2.data.filter(d=>d.city=="bilbao").map(function(d){return d["penalty"]}).reduce(function(a,n){return a+n}) }
    ]
  }
};
 var config = {};

      var charObject = uv.chart('Bar', graphdef);
        
      });
      });
      });
      });
      
      $http(mashapeES).then(function(response){
          $http(mashapeRu).then(function(response2){
              $http.get(apiPropia).then(function(response3){
          console.log(response.data);
          console.log(response2.data);
          var data = [
                            {name: 'Numero de franjas horarias ESPAÑA', value: response.data.timezones.length},
                            {name: 'Numero de franjas horarias RUSIA', value: response2.data.timezones.length},

                            {name: 'Goles de penalty', value: response3.data.map(function(d){return d["penalty"]}).reduce(function(a,n){return a+n}) },
                     
                        ];
                    
                        // create funnel chart
                        var chart = anychart.pyramid(data);
                    
                        // set chart margin
                        chart.margin(10, '20%', 10, '20%');
                    
                        // set chart legend settings
                        chart.legend()
                                .enabled(true)
                                .position('outside-right')
                                .itemsLayout('vertical')
                                .align('top');
                    
                        // set chart title
                        // set chart base width settings
                        chart.baseWidth('70%');
                    
                        // set chart labels settings
                        chart.labels()
                                .position('outside-right')
                                .format('{%Value}');
                    
                        // set container id for the chart
                        chart.container('sharedStadistics1');
                    
                        // initiate chart drawing
                        chart.draw();
                   
                    
       

      });
      });
  });
          
}]);

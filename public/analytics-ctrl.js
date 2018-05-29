/*global angular*/
/*global Highcharts*/
/*global google*/
/*global uv*/
"use strict"

angular
    .module("tvfeesManagerApp")
    .controller("analytics-ctrl", ["$scope", "$http", function($scope, $http) {



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
                            },
                            {
                                name: 'TiMaxExp',
                                data: response2.data.map(function(d) { return d["timaxexp"] })
                            }, {
                                name: 'TiLessExp',
                                data: response2.data.map(function(d) { return d["tilessexp"] })
                            }, {
                                name: 'TiSpa',
                                data: response2.data.map(function(d) { return d["tispa"] })
                            },
                            {
                                name: 'Capacity',
                                data: response3.data.map(function(d) { return d["capacity"] })
                            }, {
                                name: 'Attotal',
                                data: response3.data.map(function(d) { return d["attotal"] })
                            }, {
                                name: 'Ataverage',
                                data: response3.data.map(function(d) { return d["ataverage"] })
                            }
                        ]
                    });


                });
            });

        });
    }]);
  
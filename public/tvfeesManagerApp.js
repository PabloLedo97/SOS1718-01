/*global angular*/
angular
    .module("tvfeesManagerApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/tvfees-stats",{
                    templateUrl:"tvfeesList.html",
                    controller: "tvfeesListCtrl"
                }).when("/tvfees-stats/:city/:team",{
                    templateUrl:"tvfeesEdit.html",
                    controller: "tvfeesEditCtrl"
                }).when("/goals-stats",{
                    templateUrl:"goalsList.html",
                    controller: "goalsListCtrl"
                }).when("/goals-stats/:city/:team",{
                    templateUrl:"goalsEdit.html",
                    controller: "goalsEditCtrl"
                }) .when("/transfers-stats",{
                    templateUrl:"transfersList.html",
                    controller: "transfersListCtrl"
                }).when("/transfers-stats/:city/:team",{
                    templateUrl:"transfersEdit.html",
                    controller: "transfersEditCtrl"
                }).when("/analytics",{
                    templateUrl:"analytics.html"
                }).when("/tvfees-stats/analytics",{
                    templateUrl:"tvfeesmain.html",
                    controller: "tvfeesmain-ctrl"
                }).when("/goals-stats/analytics",{
                    templateUrl:"goalsmain.html",
                    controller: "goalsmain-ctrl"
                }).when("/transfers-stats/analytics",{
                    templateUrl:"transfersmain.html",
                    controller: "transfersmain-ctrl"
                }).when("/goals-stats/compartidas",{
                    templateUrl:"apisCompartidasGoals.html",
                    controller: "apisCompartidasGoalsCtrl"
                });
                
});
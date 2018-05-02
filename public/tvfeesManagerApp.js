/*global angular*/
angular
    .module("tvfeesManagerApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/tvfees-stats",{
                    templateUrl:"tvfeesList.html",
                    controller: "tvfeesListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"tvfeesEdit.html",
                    controller: "tvfeesEditCtrl"
                }).when("/goals-stats",{
                    templateUrl:"goalsList.html",
                    controller: "goalsListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"goalsEdit.html",
                    controller: "goalsEditCtrl"
                }) .when("/transfers-stats",{
                    templateUrl:"transfersList.html",
                    controller: "transfersListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"transfersEdit.html",
                    controller: "transfersEditCtrl"
                });
});
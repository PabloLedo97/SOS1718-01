/*global angular*/
angular
    .module("transfersApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"transfersList.html",
                    controller: "transfersListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"transfersEdit.html",
                    controller: "transfersEditCtrl"
                });
});
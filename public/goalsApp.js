/*global angular*/
angular
    .module("goalsApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"goalsList.html",
                    controller: "goalsListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"goalsEdit.html",
                    controller: "goalsEditCtrl"
                });
});
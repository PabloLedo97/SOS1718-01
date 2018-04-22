/*global angular*/
angular
    .module("tvfeesManagerApp", ["ngRoute"])
        .config(function($routeProvider){
            $routeProvider
                .when("/",{
                    templateUrl:"tvfeesList.html",
                    controller: "tvfeesListCtrl"
                }).when("/team/:city/:team",{
                    templateUrl:"tvfeesEdit.html",
                    controller: "tvfeesEditCtrl"
                });
});
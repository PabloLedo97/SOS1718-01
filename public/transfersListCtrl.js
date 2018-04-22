/* global angular */
 angular
 .module("transfersApp")
 .controller("transfersListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/transferincomes-stats";
            
            $scope.addStat= function(){
                $http.post(api,$scope.newteam).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getTeams();
                },function(){
                    if($scope.length!=6){
                    $scope.status="Error 400: debe completar todos los campos";
                    }else{
                    $scope.status="Error 409: la estadistica ya existe";
                    }
            });
            };
             $scope.deleteStat= function(city){
                console.log("Stadistic to be delete :" + city);
                $http.delete(api+"/"+city).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getTeams();
                });
                 getTeams();
            };
            
            $scope.deleteStats= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getTeams();
                });
                 getTeams();
            };
            
            function getTeams(){
                $http.get(api).then(function (response){
                    $scope.teams = response.data;
                });
            }
            
            getTeams();
}]);
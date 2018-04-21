/*global angular*/
 angular.module("tvfeesManagerApp").controller("tvfeesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/tvfees-stats";
            
            
            $scope.addTvfees= function(){
                $http.post(api,$scope.newteam).then(function (response){
                    $scope.status = "Status: " + response.status;
                    getTvFees();
                });
            /*},function(){
                    if($scope.length!=6){
                    $scope.status="Error 400: debe completar todos los campos";
                    }else{
                    $scope.status="Error 409: la estadistica ya existe";
                    }*/
            };
            
            
             $scope.deletetvfees= function(city){
                 console.log("tvfees to be delete: " + city);
                $http.delete(api+"/"+city).then(function (response){
                    $scope.status = "Status: " + response.status;
                    getTvFees();
                });
            };
            
             $scope.deleteAlltvfees= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Status: "+ response.status;
                    getTvFees();
                });
                 getTvFees();
            };
            
            
            
            function getTvFees(){
                $http.get(api).then(function (response){
                    $scope.initialteams = response.data;
                });
            }
            
            getTvFees();
            
        }]);
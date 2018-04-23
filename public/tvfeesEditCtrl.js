/* global angular */
/*global Materialize*/
angular.module("tvfeesManagerApp")
  .controller("tvfeesEditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
            console.log("Edit Ctrl initialized!");
            var statUrl = "/api/v1/tvfees-stats/"+$routeParams.city + "/" + $routeParams.team;
               
               
                $http.get(statUrl).then(function (response){
                    $scope.updatedStat= response.data[0];
                });
                
                
                $scope.updateStat= function(){
                $http.put(statUrl,$scope.updatedStat).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    $location.path("/");
                    Materialize.toast({html:'Updated correct'});
                    
                },function(){
                    var i;
                    for(i=0;i<$scope.length;i++){
                        if($scope[i]==null){
                            $scope.status="Error 400: debe completar todos los campos";
                            break;
                        }
                    }
                });
            };
            
        }]);
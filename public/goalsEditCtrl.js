/* global angular */
angular.module("tvfeesManagerApp")
  .controller("goalsEditCtrl", ["$scope","$http","$routeParams","$location", function($scope,$http,$routeParams,$location) {
            console.log("Edit Ctrl initialized!");
            var statUrl = "/api/v1/goals-stats/"+$routeParams.city + "/" + $routeParams.team;
                $http.get(statUrl).then(function (response){
                    $scope.updatedStat= response.data[0];
                });
                $scope.updateStat= function(){
                $http.put(statUrl,$scope.updatedStat).then(function (response){
                    $scope.status= "Status: "+ response.status;
                    window.alert("OK: estadistica actualizada");
                    $location.path("/");
                    
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
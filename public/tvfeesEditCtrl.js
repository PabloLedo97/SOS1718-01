 /*global angular*/
 angular.module("tvfeesManagerApp")
 .controller("tvfeesEditCtrl", ["$scope","$http","$routeParams","$location" ,function($scope,$http,$routeParams,$location) {
            console.log("Edit Ctrl initialized!");
            var tvfeesURL = "/api/v1/tvfees-stats/"+ $routeParams.city+ "/" + $routeParams.team;
            
             
                $http.get(tvfeesURL).then(function (response){
                    $scope.updatedTeam = response.data;
                });
                
          
         
            $scope.updateTeam = function(){
                $http.put(tvfeesURL,$scope.updatedTeam).then(function (response){
                    $scope.status = "Status: " + response.status;
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
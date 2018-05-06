/* global angular */
 angular
 .module("tvfeesManagerApp")
 .controller("tvfeesListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/tvfees-stats";
            
            $scope.addStat= function(){
                $http.post(api,$scope.newteam).then(function (response){
                    $scope.status= "Recurso creado";
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
                    $scope.status= "Recurso borrado";
                    getTeams();
                });
                 getTeams();
            };
            
            $scope.deleteStats= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "No hay recursos";
                    getTeams();
                });
                 getTeams();
            };
             $scope.busqueda = function() {
            console.log(api + "?" + $scope.atributo + "=" + $scope.valor);
            $http.get(api + "?" + $scope.atributo + "=" + $scope.valor).then(function successCallback(response) {
                $scope.status = "Recurso encontrado";
                $scope.teams = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Ups, something was wrong. Try it later";
            });

        };
        //Paginación

        $scope.paginacion = function() {

            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status = "Recurso obtenido";
                $scope.teams = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };



        $scope.obtenerpaginaAnterior = function() {
            $scope.offset = $scope.offset + $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status =  "Recurso obtenido";
                $scope.teams = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };

        $scope.obtenerpaginaSiguiente = function() {
            $scope.offset = $scope.offset - $scope.limit;
            $http.get(api + "?limit=" + $scope.limit + "&offset=" + $scope.offset).then(function successCallback(response) {
                $scope.status =  "Recurso obtenido";
                $scope.teams = response.data;
                $scope.error = "";
            }, function errorCallback(response) {
                console.log(response.status);
                $scope.status = response.status;
                $scope.error = "Error pagina no obtenida";
            });

        };

            
            function getTeams(){
                $http.get(api).then(function (response){
                    $scope.teams = response.data;
                });
            }
            
            getTeams();
}]);
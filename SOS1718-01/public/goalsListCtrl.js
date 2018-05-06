/* global angular */
 angular
 .module("tvfeesManagerApp")
 .controller("goalsListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v1/goals-stats";
            
            $scope.addStat= function(){
                $http.post(api,$scope.newteam).then(function (response){
                    $scope.status= "Equipo creado con éxito";
                    getTeams();
                },function(){
                    if($scope.length!=6){
                    $scope.status="Debe completar todos los campos";
                    }else{
                    $scope.status="La estadistica ya existe";
                    }
            });
            };
             $scope.deleteStat= function(city){
                console.log("Stadistic to be delete :" + city);
                $http.delete(api+"/"+city).then(function (response){
                    $scope.status= "Equipo eliminado";
                    getTeams();
                });
                 getTeams();
            };
            
            $scope.deleteStats= function(){
                console.log("all stadistic will be delete" );
                $http.delete(api+"/").then(function (response){
                    $scope.status= "Todas las estadísticas se han borrado con éxito";
                    getTeams();
                });
                 getTeams();
            };
            
            
            $scope.fromTo= function(){
                console.log("from-to" );
               
                getTeams();
          
            };
             var pag=0;
             var numero;
             $scope.getStadisticsPagination=function(num){
                 numero=num;
                  
               if(num==1){
                    pag=pag-10;
                    if(pag<0){
                            pag=0;
                            $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                            $scope.teams = response.data;
                            console.log("pagination1");
                             numero=num;
                             console.log(numero);
                             getTeams();
                            });
                           
                    }else{
                        $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.teams = response.data;
                  console.log("pagination2");
                   numero=num;
                    console.log(numero);
                     getTeams();
                });
                    }
               }else{
                  
                pag=pag+10;
                $http.get(api+"?limit="+10+"&offset="+pag).then(function (response){
                $scope.teams = response.data;
                 console.log("pagination3");
                  numero=num;
                   console.log(numero);
                    getTeams();
               });
               
                 
             }
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
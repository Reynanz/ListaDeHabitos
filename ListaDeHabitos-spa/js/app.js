var app = angular.module("app", ["ngRoute"]);

app.value("habitos", {habitos: []});

app.controller("listadehabitos", ["$scope", "$http", "habitos", function($scope, $http, habitos){
    $scope.habitos = habitos.habitos;

    if (habitos.habitos.length == 0) {
        
        $http.get("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php").then(function(resposta){
            for (indice in resposta.data){
                habitos.habitos = resposta.data
                $scope.habitos = habitos.habitos;
            }
        });
    }

    $scope.mostraLista = $scope.habitos.length == 0;
    //Atualiza status de um habito para V
    $scope.vencerHabito = function(habito){
        indice = $scope.habitos.indexOf(habito);
        habito.status = "V";

        $http.put("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php", habito).then(function(resposta){
            $scope.habitos[indice] = resposta.data;
        });
    }
    //Atualiza status de um habito para A
    $scope.retomarHabito = function(habito){
        indice = $scope.habitos.indexOf(habito);
        habito.status = "A";

        $http.put("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php", habito).then(function(resposta){
            $scope.habitos[indice] = resposta.data;
        });
    }
    //Desiste de um hábito
    $scope.desistirHabito = function(habito){
        $http.delete("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php",{params: {id: habito.id}}).then(function(resposta){
            indice = $scope.habitos.indexOf(habito);
            $scope.habitos.splice(indice, 1);
       });
    }
}]);

app.controller("novohabito", ["$scope", "$http", "habitos", function($scope, $http, habitos){
    console.log("NOVO HABITO CTRL");
    $scope.habitos = habitos.habitos;
    if (habitos.habitos.length == 0) {
        
        $http.get("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php").then(function(resposta){
            for (indice in resposta.data){
                habitos.habitos = resposta.data
                $scope.habitos = habitos.habitos;
            }
        });
    }
    $scope.nome = "";

    //Insere um novo hábito
    $scope.inserirHabito = function(nome){
        if(nome == ""){
            return;
        }
        $http.post("http://localhost/ListaDeHabitos-spa/listadehabitos-rest-api/habito.php", {nome: nome}).then(function(resposta){
            $scope.habitos.push(resposta.data);
            $scope.nome = "";
        })
        
    }
}]);

app.config(["$routeProvider", function($routeProvider) { 
    $routeProvider.when("/listadehabitos", { 
      controller: "listadehabitos", 
      templateUrl: "partials/listadehabitos.html" 
    })
    .when("/novohabito", { 
      controller: "novohabito", 
      templateUrl: "partials/novohabito.html" 
    })
    .otherwise({ 
      redirectTo: "/listadehabitos"
    }); 
}]);

app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix(""); 
}]);

// Módulo Angular com injeção de ngRoute (para rotas)
var app = angular.module("app", ["ngRoute"]);

// Injeta um valor chamado "habitos" disponível para toda a app
app.value("habitos", {habitos: []});

// Controller que gerencia a lista de hábitos
app.controller("listadehabitos", ["$scope", "$http", "habitos", function($scope, $http, habitos){
    $scope.habitos = habitos.habitos;

    // Carrega hábitos da API se ainda não estiverem carregados
    if (habitos.habitos.length == 0) {
        $http.get("http://localhost/listadehabitos-rest-api/habito.php").then(function(resposta){
            for (indice in resposta.data){
                habitos.habitos = resposta.data
                $scope.habitos = habitos.habitos;
            }
        });
    }

    // Exibe mensagem se a lista estiver vazia
    $scope.mostraLista = $scope.habitos.length == 0;

    // Marca hábito como vencido (status = "V")
    $scope.vencerHabito = function(habito){
        indice = $scope.habitos.indexOf(habito);
        habito.status = "V";
        $http.put("http://localhost/listadehabitos-rest-api/habito.php", habito).then(function(resposta){
            $scope.habitos[indice] = resposta.data;
        });
    }

    // Retoma hábito (status = "A")
    $scope.retomarHabito = function(habito){
        indice = $scope.habitos.indexOf(habito);
        habito.status = "A";
        $http.put("http://localhost/listadehabitos-rest-api/habito.php", habito).then(function(resposta){
            $scope.habitos[indice] = resposta.data;
        });
    }

    // Remove hábito da lista (desistir)
    $scope.desistirHabito = function(habito){
        $http.delete("http://localhost/listadehabitos-rest-api/habito.php",{params: {id: habito.id}}).then(function(resposta){
            indice = $scope.habitos.indexOf(habito);
            $scope.habitos.splice(indice, 1);
       });
    }
}]);

// Controller para adicionar novos hábitos
app.controller("novohabito", ["$scope", "$http", "habitos", function($scope, $http, habitos){

    $scope.habitos = habitos.habitos;

    // Carrega hábitos da API se ainda não estiverem carregados
    if (habitos.habitos.length == 0) { 
        $http.get("http://localhost/listadehabitos-rest-api/habito.php").then(function(resposta){
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
        $http.post("http://localhost/listadehabitos-rest-api/habito.php", {nome: nome}).then(function(resposta){
            $scope.habitos.push(resposta.data);
            $scope.nome = "";
        })
        
    }
}]);

// Configura rotas da SPA
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

// Remove o prefixo '!' do hash nas URLs
app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.hashPrefix(""); 
}]);

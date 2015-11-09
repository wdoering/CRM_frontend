//aqui começa conteudo relacionado a cadastro de cliente

angular.module('CRM.controllers').controller('ClientCtrl', function(ClientService, $scope, $http, $timeout, $ionicModal) {
  
  console.log("inicio da clientController");
  //essa funcao busca a lista
  ClientService.getClients().then(function(response){

    var clients = response.data;
    console.log(response.data);
    $scope.clients = clients;

  });


  //this is only so I can see the list working offline
  if(typeof $scope.clients === 'undefined'){
    $scope.clients  = ClientService.all();
  }


  //abre modal de novo cliente
  $scope.newClient = function(){ 
   console.log('newClient chamada!!');      
   $scope.client = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('components/client/views/client-add.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
  
      
      $scope.closeClientAdd = function() {
        $scope.modal.hide();
      };

      // salva novo cliente via POST
      $scope.clientAddSave = function() {
        console.log('Saving client', $scope.client);
        var data = $scope.client;
        var res = ClientService.submitNewClient(data);
        res.success(function(data, status, headers, config) {
          console.log('client POST SUCCESS');
          $scope.client.id = data;
          $scope.clients.push($scope.client);
          $scope.closeClientAdd();

        });
        res.error(function(data, status, headers, config) {
          console.log('client POST FAIL');
        }); 

      };

    };
   
  $scope.editClient = function(clientId){
    
     $ionicModal.fromTemplateUrl('components/client/views/client-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        var indexOfClient = ClientService.fetchIndex($scope.clients, clientId);
        $scope.client = $scope.clients[indexOfClient]; 
        $scope.modal.show();
      });

      $scope.closeClientEdit = function() {
        $scope.modal.hide();
      };

        // salva novo cliente via POST
      $scope.clientEditSave = function() {
        console.log('Saving Edit client', $scope.client);
        var client = $scope.client;
        var urlBase = "http://localhost:8080/client";
        var res = $http.put(urlBase, client);
        res.success(function(data, status, headers, config) {
          console.log('client PUT SUCCESS');
          $scope.closeClientEdit();

        });
        res.error(function(data, status, headers, config) {
          console.log('client PUT FAIL');
        }); 

      };

    };


      $scope.deleteClient = function(clientId){
        console.log("delete este cliente");
        
        var urlBase = "http://localhost:8080/client";
        var index = ClientService.fetchIndex($scope.clients, clientId);
        var res = ClientService.deleteClient(clientId);

        res.success(function(data, status, headers, config) {
          console.log('client DELETE  SUCCESS' + data);
          if(data === true)
            $scope.clients.splice(index, 1);
        });
        res.error(function(data, status, headers, config) {
          console.log('client DELETE  FAIL');
        }); 


      };


  })

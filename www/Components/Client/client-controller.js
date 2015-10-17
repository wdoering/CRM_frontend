
//aqui começa conteudo relacionado a cadastro de cliente
.controller('ClientCtrl', function($scope, $http, ClientFactory, $timeout, $ionicModal) {
  
  //essa funcao busca a lista
  ClientFactory.getClients().then(function(response){

    var clients = response.data;
    console.log(response.data);
    $scope.clients = clients;

  });
  
  //abre modal de novo cliente
  $scope.newClient = function(){ 
   console.log('newClient chamada!!');      
   $scope.clientData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/client-add.html', {
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
        console.log('Saving client', $scope.clientData);
        var data = $scope.clientData;
        var urlBase = "http://localhost:8080/client";
        var res = $http.post(urlBase, data);
        res.success(function(data, status, headers, config) {
          console.log('client POST SUCCESS');
          $scope.clientData.id = data;
          $scope.clients.push($scope.clientData);
          $scope.closeClientAdd();

        });
        res.error(function(data, status, headers, config) {
          console.log('client POST FAIL');
        }); 

      };

    };
   
  $scope.editClient = function(clientId){
    
     $ionicModal.fromTemplateUrl('templates/client-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.clientData = $scope.clients[clientId - 1]; //refactor this in case this list becomes reordable
        $scope.modal.show();
      });

      $scope.closeClientEdit = function() {
        $scope.modal.hide();
      };

        // salva novo cliente via POST
      $scope.clientEditSave = function() {
        console.log('Saving Edit client', $scope.clientData);
        var client = $scope.clientData;
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


      $scope.deleteClient = function(clientId, itemIndex){
        console.log("delete este cliente");
        
        var urlBase = "http://localhost:8080/client";
        var data = {id: clientId};
        var res = $http.delete(urlBase + "?id=" + clientId);
        res.success(function(data, status, headers, config) {
          console.log('client DELETE  SUCCESS' + data);
          $scope.clients.splice(itemIndex, 1);

        });
        res.error(function(data, status, headers, config) {
          console.log('client DELETE  FAIL');
        }); 


      };


  })

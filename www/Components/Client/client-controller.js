//aqui começa conteudo relacionado a cadastro de cliente

angular.module('CRM.controllers').controller('ClientCtrl', function (ClientService, LocationService, $scope, $http, $timeout, $ionicModal) {


  ClientService.getClients().then(function (response) {

    var clients = response.data;
    console.log(response.data);
    $scope.clients = clients;

  });

  //this is only so I can see the list working offline
  if (typeof $scope.clients === 'undefined') {
    $scope.clients = ClientService.all();
  }

  //abre modal de novo cliente
  $scope.newClient = function () {
    $scope.client = {};
    $ionicModal.fromTemplateUrl('components/client/views/client-add.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.states = LocationService.statesBR();
      $scope.modal = modal;
      $scope.modal.show();
    });


    $scope.closeClientAdd = function () {
      $scope.modal.hide();
    };

    // salva novo cliente via POST
    $scope.clientAddSave = function () {
      console.log('Saving client', $scope.client);
      var data = $scope.client;
      var res = ClientService.submitNewClient(data);
      res.success(function (data, status, headers, config) {
        console.log('client POST SUCCESS');
        $scope.client.id = data;
        $scope.clients.push($scope.client);
        $scope.closeClientAdd();

      });
      res.error(function (data, status, headers, config) {
        console.log('client POST FAIL');
      });

    };

  };

  $scope.editClient = function (clientId) {

    $ionicModal.fromTemplateUrl('components/client/views/client-edit.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
      $scope.states = LocationService.statesBR();
      var indexOfClient = ClientService.fetchIndex($scope.clients, clientId);
      $scope.client = $scope.clients[indexOfClient];
      $scope.selected = $scope.states[$scope.client.stateID - 1];
      $scope.modal.show();
    });

    $scope.closeClientEdit = function () {
      $scope.modal.hide();
    };

    // salva novo cliente via POST
    $scope.clientEditSave = function () {
      console.log('Saving Edit client', $scope.client);
      var client = $scope.client;
      //gambiarra das forte ate conseguir fazer via configuracao
      // objetivo eh fazer com que o seletor de estados consista com o model
      client.stateID = this.selected.id;
      var res = ClientService.submitEditClient(client);

      res.success(function (data, status, headers, config) {
        console.log('client PUT SUCCESS');

        $scope.closeClientEdit();

      });
      var indexOfClient = ClientService.fetchIndex($scope.clients, clientId)
      $scope.clients[indexOfClient] = $scope.client;

      res.error(function (data, status, headers, config) {
        console.log('client PUT FAIL');
      });

    };

  };

  $scope.deleteClient = function (clientId) {
    console.log("delete este cliente");

    var index = ClientService.fetchIndex($scope.clients, clientId);
    var res = ClientService.deleteClient(clientId);

    res.success(function (data, status, headers, config) {
      console.log('client DELETE  SUCCESS' + data);
      if (data === true)
        $scope.clients.splice(index, 1);
    });
    res.error(function (data, status, headers, config) {
      console.log('client DELETE  FAIL');
    });


  };


})

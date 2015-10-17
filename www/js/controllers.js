angular.module('CRM.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.factory('ClientFactory', function($http){
  var urlBase = "http://localhost:8080/client";
  return{
    all: function(){
      return [
      { name: 'Cliente 1', id: 1 },
      { name: 'Cliente 2', id: 2 },
      { name: 'Cliente 3', id: 3 },
      { name: 'Cliente 4', id: 4 },
      { name: 'Cliente 5', id: 5 }
      ];
    },
    getClients: function(){
      return $http.get(urlBase);
    },
    submitNewClient : function(clientData){
      return $http.post(urlBase, clientData);
    },
    deleteClient : function(clientId){
      //return true;
      return $http.delete(urlBase + "?id=" + clientId); // ajeitar essa gambiarra da querystring
    },
    fetchIndex : function (objList,clientId) {
      var indexofObject = -1;
      angular.forEach(objList, function(client) {
           if(clientId === client.id){
              console.log(objList.indexOf(client));
              indexofObject = objList.indexOf(client);
           }
      });
      return indexofObject;
    }
  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})



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
   $scope.client = {};

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
        console.log('Saving client', $scope.client);
        var data = $scope.client;
        var urlBase = "http://localhost:8080/client";
        //var res = $http.post(urlBase, data);
        var res = ClientFactory.submitNewClient(data);
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
    
     $ionicModal.fromTemplateUrl('templates/client-edit.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal = modal;
        var indexOfClient = ClientFactory.fetchIndex($scope.clients, clientId);
        $scope.client = $scope.clients[indexOfClient]; //refactor this in case this list becomes reordable
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
        var index = ClientFactory.fetchIndex($scope.clients, clientId);
        var res = ClientFactory.deleteClient(clientId);
        //var index = $scope.clients.indexOf(client);

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


//aqui termina conteudo relacionado a cadastro de cliente


//componente GOOGLE MAPS

.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
  function initialize() { 
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);
    console.log("criou o mapa com as coordenadas default");
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      ionic.Platform.ready(initialize); 
      //google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
    })


//just a sample
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
  { title: 'Reggae', id: 1 },
  { title: 'Chill', id: 2 },
  { title: 'Dubstep', id: 3 },
  { title: 'Indie', id: 4 },
  { title: 'Rap', id: 5 },
  { title: 'Cowbell', id: 6 }
  ];
})


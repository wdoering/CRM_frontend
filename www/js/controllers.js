angular.module('starter.controllers', [])

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

.factory('ClientFactory', function(){
  return{
    all: function(){
      return [
          { title: 'Cliente 1', id: 1 },
          { title: 'Cliente 2', id: 2 },
          { title: 'Cliente 3', id: 3 },
          { title: 'Cliente 4', id: 4 },
          { title: 'Cliente 5', id: 5 }
      ];
    }

  }

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})



//aqui começa conteudo relacionado a cadastro de cliente
.controller('ClientCtrl', function($scope, $http, ClientFactory, $timeout, $ionicModal) {
  //essa funcao busca a lista
  //$scope.clients = ClientFactory.all();

  $scope.all = function(){ 
    $scope.clients = ClientFactory.all();
  };

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

      // Triggered in the login modal to close it
  $scope.closeClientAdd = function() {
        $scope.modal.hide();
  };

      // Open the login modal
  $scope.clientAdd = function() {
      $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.clientSave = function() {
        console.log('Saving client', $scope.clientData);
        var data = $scope.clientData;
        // $http.post('/someUrl', data).then();

        var caralhoRastejante = data.cnpj;
        $http({
          // url: myUrl,
             url: 'http://localhost/URLLOKA',
          method: 'POST',
          data: caralhoRastejante,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });   

        // Simulate a delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
          $scope.closeLogin();
        }, 1000);
  };

}

})

.controller('ClientAddCtrl', function($scope, $http) {
  
   $scope.clientData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/client-add.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeClientAdd = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.clientAdd = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.clientSave = function() {
    console.log('Saving client', $scope.clientData);

    // Simulate a delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

})

//aqui termina conteudo relacionado a cadastro de cliente



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
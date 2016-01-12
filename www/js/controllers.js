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


// //just a sample
// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//   { title: 'Reggae', id: 1 },
//   { title: 'Chill', id: 2 },
//   { title: 'Dubstep', id: 3 },
//   { title: 'Indie', id: 4 },
//   { title: 'Rap', id: 5 },
//   { title: 'Cowbell', id: 6 }
//   ];
// })

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// })



//componente GOOGLE MAPS

.controller('MapCtrl', function($scope, NgMap, $ionicLoading, $compile) {

var vm = this;
  vm.positions = [
    [54.779951, 9.334164], [47.209613, 15.991539],
    [51.975343, 7.596731], [51.97539, 7.596962], 
    [47.414847, 8.23485], [47.658028, 9.159596],
    [47.525927, 7.68761], [50.85558, 9.704403],
    [54.320664, 10.285977], [49.214374, 6.97506],
    [52.975556, 7.596811], [52.975556, 7.596811],
    [52.975556, 7.596811], [52.975556, 7.596811], 
    [52.975556, 7.596811], [52.975556, 7.596811],
    [52.975556, 7.596811], [52.975556, 7.596811],
    [52.975556, 7.596811], [52.975556, 7.596811]];
    
    vm.dynMarkers = []
    NgMap.getMap().then(function(map) {
      var bounds = new google.maps.LatLngBounds();
      for (var k in map.customMarkers) {
        var cm = map.customMarkers[k];
        vm.dynMarkers.push(cm);
        bounds.extend(cm.getPosition());
      };
      
      vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
      map.setCenter(bounds.getCenter());
      map.fitBounds(bounds);  
   });



//  function initialize() { 
//    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
//
//    var mapOptions = {
//      center: myLatlng,
//      zoom: 16,
//      mapTypeId: google.maps.MapTypeId.ROADMAP
//    };
//    var map = new google.maps.Map(document.getElementById("map"),
//      mapOptions);
//    console.log("criou o mapa com as coordenadas default");
//        //Marker + infowindow + angularjs compiled ng-click
//        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
//        var compiled = $compile(contentString)($scope);
//
//        var infowindow = new google.maps.InfoWindow({
//          content: compiled[0]
//        });
//
//        var marker = new google.maps.Marker({
//          position: myLatlng,
//          map: map,
//          title: 'Uluru (Ayers Rock)'
//        });
//
//        google.maps.event.addListener(marker, 'click', function() {
//          infowindow.open(map,marker);
//        });
//
//        $scope.map = map;
//      }
//      ionic.Platform.ready(initialize); 
//      //google.maps.event.addDomListener(window, 'load', initialize);
//      
//      $scope.centerOnMe = function() {
//        if(!$scope.map) {
//          return;
//        }
//
//        $scope.loading = $ionicLoading.show({
//          content: 'Getting current location...',
//          showBackdrop: false
//        });
//
//        navigator.geolocation.getCurrentPosition(function(pos) {
//          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
//          $scope.loading.hide();
//        }, function(error) {
//          alert('Unable to get location: ' + error.message);
//        });
//      };
//      
//      $scope.clickTest = function() {
//        alert('Example of infowindow with ng-click')
//      };
//      
    })




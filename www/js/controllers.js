angular.module('CRM.controllers', [])

  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  })

  //componente GOOGLE MAPS

  .controller('MapCtrl', function ($scope, NgMap, $ionicLoading, $compile) {

    var vm = this;
    vm.positions = [
      [-29.79, -51.15], [-28.79, -50.15], [-27.79, -49.15],
      [-25.79, -48.15], [-27.79, -48.15], [-26.79, -48.15]

    ];

    vm.dynMarkers = []
    NgMap.getMap().then(function (map) {
      var bounds = new google.maps.LatLngBounds();
      // //for (var k in map.customMarkers) {
      // for (var k in vm.positions) {
      //   var cm = map.customMarkers[k];
      //   vm.dynMarkers.push(cm);
      //   bounds.extend(cm.getPosition());
      // };

      //vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
      //map.setCenter(bounds.getCenter());
      //-29.7876900,-51.1370170   
      var myLatLng = { lat: -29.7876900, lng: -51.1370170 };
      map.fitBounds(bounds);

      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Hello World!'
      });



    });

  })




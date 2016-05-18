// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('CRM', ['ionic', 'CRM.controllers','ngMap'])

//bloco de variaveis de ambiente
 .constant('SERVER_URL','http://localhost:8080')
 .constant('CLIENT_CTRL','/client')
 .constant('PRODUCT_CTRL','/product')
 .constant('PRODUCT_TYPE_CTRL','/producttype')
 .constant('MANUFACTURER_CTRL','/manufacturer')


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.client', {
    url: '/client',
    views: {
      'menuContent': {
        templateUrl: 'components/client/views/client.html',
        controller: 'ClientCtrl'
      }
    }
  })
    
  
  .state('app.product', {
    url: '/product',
    views: {
      'menuContent': {
        templateUrl: 'components/product/views/product.html',
        controller: 'ProductCtrl'
      }
    }
  })
    
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html',
        controller: 'MapCtrl'
      }
    }
  })

  // Aqui jaz um jeito diferente do meu de fazer CRUD master detail e tals... usando url / ID inves de queystring
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/product');
});

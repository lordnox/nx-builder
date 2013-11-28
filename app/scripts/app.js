
var module = angular.module('app', [
    'ui.router',
    'Scope.safeApply',
    'configuration',
    'youtube',
    'simple'
  ])

  .config(function($locationProvider, $urlRouterProvider, configProvider) {
    $urlRouterProvider.otherwise("/youtube/videos");
    var config = configProvider.config;
    if(config.routing.html5Mode) {
      $locationProvider.html5Mode(true);
    }
    else {
      var routingPrefix = config.routing.prefix;
      if(routingPrefix && routingPrefix.length > 0) {
        $locationProvider.hashPrefix(routingPrefix);
      }
    }
  })

  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
;

//window.App = module;
var module = angular.module('app', [
    'ui.router',
    'Scope.safeApply',
    'youtube',
    'simple'
  ])

  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise("/youtube/videos");
  })

  .run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  })
;

//window.App = module;
var module = angular.module('app', [
  'ngRoute',
  'Scope.safeApply',
  'App.Routes',
  'youtube',
  'simple'
]);

module.run(function() {
  console.log('app-Module running');
});

window.App = module;
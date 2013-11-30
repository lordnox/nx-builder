var app = angular.module('home', [])

  .config(function ($stateProvider, configProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        data: {
          menuTitle: 'Home Page'
        },
        templateUrl: configProvider.prepareViewTemplateUrl('home/index')
      })
  });



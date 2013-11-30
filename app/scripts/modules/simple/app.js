var app = angular.module('simple', [])

  .config(function ($stateProvider, configProvider) {

    $stateProvider
      .state('simple', {
        url: '/simple',
        data: {
          menuTitle: 'Simple Page'
        },
        templateUrl: configProvider.prepareViewTemplateUrl('other/index')
      })
  });



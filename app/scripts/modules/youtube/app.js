

var app = angular.module('youtube', ['configuration'])

  .config(function ($stateProvider, configProvider) {

    $stateProvider
      .state('youtube', {
        //abstract: true,
        url: '/youtube',
        data: {
          menuTitle: 'Youtube - Module'
        },
        template: '<ui-view/>'
      })
      .state('youtube.videos', {
        url: '/videos',
        controller: 'VideosCtrl',
        templateUrl: configProvider.prepareViewTemplateUrl('videos/index')
      })
      .state('youtube.search', {
        url: '/search/:query',
        controller: 'SearchCtrl',
        templateUrl: configProvider.prepareViewTemplateUrl('videos/index')
      })
      .state('youtube.video', {
        url: '/video/:id',
        controller: 'VideoCtrl',
        templateUrl: configProvider.prepareViewTemplateUrl('videos/show')
      })
      .state('youtube.watched', {
        url: '/watched-videos',
        controller: 'WatchedVideosCtrl',
        templateUrl: configProvider.prepareViewTemplateUrl('videos/watched_videos')
      });
  });

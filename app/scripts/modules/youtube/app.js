

var app = angular.module('youtube', ['configuration']);

    // ROUTER.when('videos_path', '/videos', {
    //   controller : 'VideosCtrl',
    //   templateUrl : CONFIG.prepareViewTemplateUrl('videos/index')
    // });

    // ROUTER.when('video_path', '/videos/:id', {
    //   controller : 'VideoCtrl',
    //   templateUrl : CONFIG.prepareViewTemplateUrl('videos/show')
    // });

    // ROUTER.when('watched_videos_path', '/watched-videos', {
    //   controller : 'WatchedVideosCtrl',
    //   templateUrl : CONFIG.prepareViewTemplateUrl('videos/watched_videos')
    // });


app.config(function ($stateProvider, configProvider) {

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

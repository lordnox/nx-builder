angular.module('youtube')
  .controller('VideosCtrl', ['$appYoutubeSearcher', '$location', '$appStorage', '$stateParams', '$scope', function($youtube, $location, $storage, $params, $scope) {
    $scope.search = false;
    $youtube.query('angularjs', true, function(q, videos) {
      $scope.videos = videos;
      $scope.onReady();
    });
  }])


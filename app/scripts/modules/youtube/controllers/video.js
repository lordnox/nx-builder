
angular.module('youtube')
  .controller('VideoCtrl', ['$appYoutubeSearcher', '$stateParams', '$scope', '$sce',
    function($youtube, $params, $scope, $sce) {
      var id = $params.id;
      $youtube.findVideo(id, true, function(id, video) {
        $scope.video_id = id;
        $scope.video = video;
        $scope.stars = video.rating;

        $youtube.addToWatchedVideos(video);
        $scope.onReady();

        $scope.video.embedUrl = $sce.trustAsResourceUrl($scope.video.embedUrl);

        $youtube.query(video.title, true, function(q, videos) {
          $scope.related = videos;
          if(!$scope.$$phase) $scope.$apply();
        });
      });
    }]);

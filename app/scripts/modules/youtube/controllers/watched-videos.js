angular.module('youtube')
  .controller('WatchedVideosCtrl', ['$appYoutubeSearcher','$appStorage', '$scope', function($youtube, $storage, $scope) {
    $scope.videos = $youtube.getWatchedVideos();
    $scope.sortFn = function(entry) {
      return entry.timestamp;
    };
    $scope.onReady();
  }])

angular.module('youtube')
  .controller('SearchCtrl', ['$appYoutubeSearcher', '$rootScope', '$scope',
    function($youtube, $rootScope, $scope) {
      $scope.search = true;
      if($rootScope.search)
        $scope.query = $rootScope.search.query;
      else
        $scope.query = 'angularjs';
      $youtube.query($scope.query, true, function(q, videos) {
        console.log(q);
        $scope.videos = videos;
        $scope.onReady();
      });
    }])


angular.module('youtube')
  .controller('AppCtrl', ['$appTimer', '$rootScope', '$state', '$scope',
    function($timer, $rootScope, $state, $scope) {
      $scope.search = function(query, skip) {
        var S = function() {
          $rootScope.search = {
            query: query
          }
          $state.go('youtube.search', {
            query: encodeURIComponent(query)
          });
        }
        if(skip) {
          S();
        }
        else {
          $timer(function() {
            S();
          });
        }
      };

      $scope.onReady();
    }])

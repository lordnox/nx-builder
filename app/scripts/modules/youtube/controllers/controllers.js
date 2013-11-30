
angular.module('youtube')

  .run(['$rootScope', '$appScope', function($rootScope, $appScope) {
    $rootScope.$on("$routeChangeStart", function(event, next, current) {
      $rootScope.onLoading();
    });

    $rootScope.onLoading = function() {
      $rootScope.$safeApply(function() {
        $rootScope.loading = true;
        $rootScope.status = 'loading';
      },this);
    };

    $rootScope.onReady = function() {
      $rootScope.$safeApply(function() {
        $rootScope.loading = false;
        $rootScope.status = 'ready';
      },this);
    };
  }])

;
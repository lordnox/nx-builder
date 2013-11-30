
angular.module('youtube')

  .factory('$appScope', ['$rootScope', function($rootScope) {

    return {

      topScope : function() {
        return this.scope(document);
      },

      scope : function(element) {
        return angular.element(element).scope();
      },

      rootScope : function() {
        return $rootScope;
      },

      safeApply : function(fn, $scope) {
        $scope = $scope || this.topScope();
        fn = fn || function() {};
        if($scope.$$phase) {
          fn();
        }
        else {
          $scope.$apply(function() {
            fn();
          });
        }
      }

    };
  }])
;

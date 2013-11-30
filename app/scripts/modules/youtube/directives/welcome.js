
angular.module('youtube')

  .directive('appWelcome', function() {
    return function($scope, element, attrs) {
      var html = element.html();
      element.html('Welcome: <strong>' + html + '</strong>');
    };
  })

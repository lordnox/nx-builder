
angular.module('youtube')

  .directive('appYoutubeListing', ['$state', function($state) {
    return function($scope, element, attrs) {
      element.bind('click', function() {
        var elm = angular.element(this);
        var id = elm.attr('data-app-youtube-listing-id');
        $state.go('youtube.video', { id: id });
      });
    };
  }])


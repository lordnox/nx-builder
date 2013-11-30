
angular.module('youtube')

  .directive('appYoutubeListings', [function() {
    var listingSelector = '.app-youtube-listing';
    var className = 'app-youtube-listings';

    return function($scope, element, attrs) {
      element.addClass(className);
    };
  }]);

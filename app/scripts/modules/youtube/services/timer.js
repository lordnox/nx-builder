
angular.module('youtube')

  .factory('$appTimer', function() {

    var _delay = 500;
    var _timer = -1;

    return function(fn) {
      clearTimeout(_timer);
      _timer = setTimeout(function() {
        fn();
      }, _delay);
    };
  })

;


angular.module('youtube')

  .factory('$appSanitize', function() {
    return {
      trim : function(str) {
        return str.replace(/^\s+|\s+$/g, '');
      },
      urlEncode : function(str) {
        return escape(str);
      },
      prepareForUrl : function(str) {
        str = this.trim(str);
        str = this.urlEncode(str);
        return str;
      }
    };
  })

;
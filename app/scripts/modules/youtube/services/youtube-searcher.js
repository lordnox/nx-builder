
angular.module('youtube')

  .factory('$appYoutubeSearcher',['$appStorage','$appSanitize','$q','$http',function($storage, $sanitize, $q, $http) {

    var searchToken = '{SEARCH}';
    var callbackToken = 'JSON_CALLBACK';

    var videoBaseUrl = 'https://gdata.youtube.com/feeds/api/videos/'+searchToken+'?v=2&alt=json&callback='+callbackToken;
    var searchBaseUrl = 'https://gdata.youtube.com/feeds/api/videos?q='+searchToken+'&v=2&alt=json&callback='+callbackToken;

    var keyPrefix = 'youtube-';
    var watchedVideosKey = keyPrefix + 'watchedVideos';

    return {

      prefixKey : function(value) {
        return keyPrefix + value;
      },

      resize : function(w1, h1, w2, h2) {
        var r;
        if(w1 > w2) {
          r = w2 / w1;
          w1 = w2;
          h1 *= r;
        }
        if(h1 > h2) {
          r = h2 / h1;
          h1 = h2;
          w1 *= r;
        }
        return [w1, h1];
      },

      prepareImage : function(thumb, maxWidth, maxHeight) {
        var url = thumb.url;
        var w = thumb.width;
        var h = thumb.height;
        var sizes = this.resize(w, h, maxWidth, maxHeight);
        return {
          url : url,
          width : sizes[0],
          height : sizes[1]
        };
      },

      getWatchedVideos : function() {
        if(!this.watchedVideos) {
          var json = $storage.get(watchedVideosKey);
          if(json) {
            this.watchedVideos = JSON.parse(json);
          }
          else {
            this.watchedVideos = [];
          }
        }
        return this.watchedVideos;
      },

      addToWatchedVideos : function(entry) {
        var id = entry.id;
        var vids = this.getWatchedVideos();
        for(var i=0;i<vids.length;i++) {
          var v = vids[i];
          if(v.id == id) return;
        }
        entry.timestamp = (new Date().getTime());
        vids.push(entry);
        var json = JSON.stringify(vids);
        $storage.put(watchedVideosKey, json);
        this.watchedVideos = vids;
      },

      filterEntry : function(entry) {
        var IMAGE_MAX_HEIGHT = 250;
        var IMAGE_MAX_WIDTH = 250;
        var THUMB_MAX_HEIGHT = 80;
        var THUMB_MAX_WIDTH = 200;

        var $media      = entry.media$group;
        var $thumbs     = $media.media$thumbnail || [];

        var title       = entry.title.$t;
        var id          = $media.yt$videoid.$t;
        var keywords    = $media.media$keywords || '';
        var description = $media.media$description.$t;
        var rating      = 0;
        if(entry.gd$rating) {
          rating = parseInt(entry.gd$rating.average);
        }

        var width       = 560
        var height      = 315
        var embedUrl = 'http://www.youtube.com/embed/' + id + '?autoplay=1';

        var image, thumbnails = [];
        for(var i=0;i<$thumbs.length;i++) {
          var t = $thumbs[i];
          thumbnails.push(this.prepareImage(t, THUMB_MAX_WIDTH, THUMB_MAX_HEIGHT));
          var name = t.yt$name;
          if(name == 'hqdefault') {
            image = this.prepareImage(t, IMAGE_MAX_WIDTH, IMAGE_MAX_HEIGHT);
          }
        }

        return {
          id : id,
          title : title,
          width : width,
          height : height,
          description : description,
          image : image,
          thumbnails : thumbnails,
          rating : rating,
          keywords : keywords,
          embedUrl : embedUrl
        };
      },

      filterData : function(data) {
        var listings = [];
        var feed = data['feed'];
        var entries = feed['entry'];
        for(var i=0;i<entries.length;i++) {
          var listingData = this.filterEntry(entries[i]);
          listings.push(listingData);
        };
        return listings;
      },

      findVideo : function(q, cache, onSuccess, onFailure) {
        onSuccess = onSuccess || function() {};
        onFailure = onFailure || function() {};

        var that = this;
        var url = videoBaseUrl.replace(searchToken, q);

        var key = this.prefixKey(q);
        if(cache && $storage.isPresent(key)) {
          onSuccess(q, $storage.get(key));
          return;
        }

        $http.jsonp(url).
          success(function(data) {
            var video = that.filterEntry(data.entry);
            $storage.put(key, video);
            onSuccess(q, video);
          }).
          error(function() {
            $storage.put(key, null);
            onFailure(q);
          });
      },

      search : function(q, cache, onSuccess, onFailure) {
        onSuccess = onSuccess || function() {};
        onFailure = onFailure || function() {};

        var that = this;
        var url = searchBaseUrl.replace(searchToken, q);
        var key = this.prefixKey(q);

        $http.jsonp(url).
          success(function(data) {
            data = that.filterData(data);
            if(cache) $storage.put(key, data);
            onSuccess(q, data);
          }).
          error(function() {
            if(cache) $storage.put(key, null);
            onFailure(q);
          });
      },

      query : function(q, cache, onSuccess, onFailure) {
        onSuccess = onSuccess || function() {};
        q = $sanitize.prepareForUrl(q);
        if(cache) {
          var key = this.prefixKey(q);
          if($storage.isPresent(key)) {
            onSuccess(q, $storage.get(key));
            return;
          }
        }
        return this.search(q, cache, onSuccess, onFailure);
      }

    };
  }])

;

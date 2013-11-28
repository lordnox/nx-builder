//
// test/midway/routesSpec.js
//
describe("Midway: Testing Routes", function() {

  var tester, router;
  beforeEach(function() {
    if(tester) {
      tester.destroy();
    }
    tester = ngMidwayTester('app', {
      template : '<div><div ui-view></div></div>'
    });
  });

  it("should reroute '/' to '/videos'", function(done) {
    tester.visit("/", function() {
      tester.path().should.be.equal("/youtube/videos");
      done();
    });
  });

  it("should have a working '/videos' path", function(done) {
    tester.visit("/youtube/videos", function() {
      var current = tester.rootScope().$state.current;
      current.url.should.be.equal("/videos");
      current.name.should.be.equal("youtube.videos");
      current.controller.should.be.equal("VideosCtrl");
      done();
    });
  });

  it("should have a working '/watched-videos' path", function(done) {
    tester.visit("/youtube/watched-videos", function() {
      var current = tester.rootScope().$state.current;
      current.url.should.be.equal("/watched-videos");
      current.name.should.be.equal("youtube.watched");
      current.controller.should.be.equal("WatchedVideosCtrl");
      done();
    });
  });

  it("should have a working '/videos/10' path", function(done) {
    tester.visit("/youtube/video/10", function() {
      var $rootScope = tester.rootScope()
        , $state = $rootScope.$state
        , $stateParams = $rootScope.$stateParams
        , current = $state.current;

      current.url.should.be.equal("/video/:id");
      current.name.should.be.equal("youtube.video");
      current.controller.should.be.equal("VideoCtrl");
      $stateParams.id.should.be.equal('10');
      done();
    });
  });

});

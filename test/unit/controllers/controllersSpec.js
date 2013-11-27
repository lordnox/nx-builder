//
// test/unit/controllers/controllersSpec.js
//
describe("Unit: Testing Controllers", function() {

  var module
    , $rootScope
    , $controller
    ;

  var controller = function(ctrl, mock) {
   //create a scope object for us to use.

    if(!mock) mock = {};
    if(!mock.$scope) {
      mock.$scope = $rootScope.$new();
    }

    //now run that scope through the controller function,
    //injecting any services or other injectables we need.
    return $controller(ctrl, mock);
  };

  beforeEach(angular.mock.module('app'));

  beforeEach(function() {
    module = angular.module('app');
  });

  /* IMPORTANT!
   * this is where we're setting up the $scope and
   * calling the controller function on it, injecting
   * all the important bits, like our mockService */
  beforeEach(inject(function(_$rootScope_, _$controller_) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
  }));

  it('should have a AppCtrl controller', function() {
    controller('AppCtrl').should.be.a.object;
  });

  it('should have a VideosCtrl controller', function() {
    controller('VideosCtrl').should.be.a.object;
  });

  it('should have a OtherCtrl controller', function() {
    controller('OtherCtrl').should.be.a.object;
  });

  it('should have a WatchedVideosCtrl controller', function() {
    controller('WatchedVideosCtrl').should.be.a.object;
  });

  it('should have a VideoCtrl controller', function() {
    controller('VideoCtrl').should.be.a.object;
  });

  it('should have a properly working VideosCtrl controller', inject(function($httpBackend) {
    var searchTestAtr = 'cars';
    var response = $httpBackend.expectJSONP('https://gdata.youtube.com/feeds/api/videos?q=' + searchTestAtr + '&v=2&alt=json&callback=JSON_CALLBACK');
    response.respond(null);

    var ctrl = controller('VideosCtrl', {
      $routeParams : {
        q : searchTestAtr
      }
    });
  }));

  it('should have a properly working VideoCtrl controller', inject(function($httpBackend) {
    var searchID = 'cars';
    var response = $httpBackend.expectJSONP('https://gdata.youtube.com/feeds/api/videos/' + searchID + '?v=2&alt=json&callback=JSON_CALLBACK');
    response.respond(null);

    var ctrl = controller('VideoCtrl', {
      $routeParams : {
        id : searchID
      }
    });
  }));

  it('should have a properly working WatchedVideosCtrl controller', inject(function($httpBackend) {
    var $scope = $rootScope.$new();
    //we're stubbing the onReady event
    $scope.onReady = function() { };
    var ctrl = controller('WatchedVideosCtrl', { $scope: $scope });
  }));

});

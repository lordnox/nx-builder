//
// test/midway/appSpec.js
//
describe("Midway: Testing Modules", function() {

  describe("app Module:", function() {

    var module;
    before(function() {
      module = angular.module("app");
    });

    it("should be registered", function() {
      expect(module).not.to.equal(null);
    });

    describe("Dependencies:", function() {

      var deps;
      var hasModule = function(m) {
        return deps.indexOf(m) >= 0;
      };
      before(function() {
        deps = module.value('appName').requires;
      });

      //you can also test the module's dependencies
      it("should have App.Routes as a dependency", function() {
        expect(hasModule('App.Routes')).to.equal(true);
      });

      //you can also test the module's dependencies
      it("should have youtube as a dependency", function() {
        expect(hasModule('youtube')).to.equal(true);
      });


    });
  });
});

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
      it("should have ui-router as a dependency", function() {
        hasModule('ui.router').should.be.ok;
      });

      //you can also test the module's dependencies
      it("should have youtube as a dependency", function() {
        hasModule('youtube').should.be.ok;
      });
    });
  });
});

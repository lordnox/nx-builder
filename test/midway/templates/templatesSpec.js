//
// test/midway/templates/templatesSpec.js
//
describe("Midway: Testing Templates", function() {
  return;
  it("should load the template for the videos page properly", function(done) {
    var tester = ngMidwayTester('app');
    tester.visit('/videos?123', function() {
      var current = tester.inject('$route').current;
      var controller = current.controller;
      var template = current.templateUrl;
      expect(template).to.match(/templates\/views\/videos\/index_tpl\.html/);
      tester.destroy();
      done();
    });
  });

});

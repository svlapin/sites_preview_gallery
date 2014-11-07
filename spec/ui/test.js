'use strict';

describe('MainController', function() {
  var scope, ctrl;

  beforeEach(module('previewer'));

  beforeEach(inject(function($controller) {
    scope = {};
    ctrl = $controller('MainController', {$scope: scope});
  }));

  it('scope status should be defined', inject(function($controller) {
    expect(scope.status).toBeDefined();
  }));

  it('scope previews should be an empty array', inject(function($controller) {
    expect(scope.previews.length).toBeDefined();
    expect(scope.previews.length).toEqual(0);
  }));

  it('scope addNew should be a function', inject(function($controller) {
    expect(typeof scope.addNew).toEqual('function');
  }));
});

'use strict';

describe('MainController', function() {
  var scope, ctrl;

  beforeEach(module('previewer'));

  beforeEach(inject(function($controller) {
    scope = {};
    ctrl = $controller('MainController', {$scope: scope});
  }));

  it('should be defined', inject(function($controller) {
    expect(scope.status).toBeDefined();
  }));
});

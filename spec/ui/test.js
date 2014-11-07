'use strict';

describe('MainController', function() {
  beforeEach(module('previewer'));

  it('should be defined', inject(function($controller) {
    var scope = {};
    var ctrl = $controller('MainController', {$scope: scope});

    expect(scope.status).toBeDefined();
  }));
});

(function() {
  'use strict';

  var app = angular.module('previewer', []);

  app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.name = 'My'
  }]);
})();

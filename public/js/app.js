(function() {
  'use strict';

  var app = angular.module('previewer', []);

  app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.previews = [];
    $scope.status = {};
    $scope.addNew = function() {
      $scope.status = {
        pending: true
      };
      $http.get('/preview?url=' + encodeURI($scope.newUrl))
        .success(function(data) {
          $scope.previews.push({
            path: data.path,
            url: data.url
          });
          $scope.status = {};
        })
        .error(function(data) {
          $scope.status = {
            error: data.error
          };
        });
    };
  }]);

  app.directive('previews', function() {
    return {
      templateUrl: 'previews.html'
    };
  });
})();

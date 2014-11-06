(function() {
  'use strict';

  var app = angular.module('previewer', []);

  app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.previews = [];
    $scope.addNew = function() {
      $scope.pending = true;
      $http.get('/preview?url=' + encodeURI($scope.newUrl))
        .success(function(data) {
          $scope.pending = false;
          $scope.previews.push({
            path: data.path,
            url: data.url
          });
        })
        .error(function(data) {
          $scope.pending = false;
          $scope.error = data.error;
        });
    };
  }]);
})();

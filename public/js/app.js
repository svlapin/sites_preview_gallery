(function() {
  'use strict';

  var app = angular.module('previewer', []);

  app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.previews = [];
    $scope.addNew = function() {
      $http.get('/preview?url=' + encodeURI($scope.newUrl))
        .success(function(data) {
          $scope.previews.push(data.path);
          console.log($scope.previews);
        })
        .error(function(data) {
          $scope.error = data.error;
        });
    };
  }]);
})();

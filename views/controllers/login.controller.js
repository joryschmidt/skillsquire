angular.module('ssq')

.controller('loginCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.user = {};
  
  $scope.sub = function() {
    $http({ method: 'POST', url: '/login', data: $scope.user });
  };
}]);
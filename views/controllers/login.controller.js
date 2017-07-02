angular.module('ssq')

.controller('loginCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({ method: 'POST', url: '/login', data: $scope.user });
  };
}]);
angular.module('ssq')

.controller('signupCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/', data: $scope.user });
    $location.path('/login');
  };
}]);
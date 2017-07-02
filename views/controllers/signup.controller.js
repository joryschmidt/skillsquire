angular.module('ssq')

.controller('signupCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/', data: $scope.user });
  };
}]);
angular.module('ssq')

.controller('signupCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.user = {};
  
  $scope.submit = function() {
    if ($scope.user.password == $scope.user.confirmation) {
      $http({method: 'POST', url: '/user', data: $scope.user }).then(function() {
        $location.path('/login');
      });
    } else {
      alert('Password fields do not match');
    }
  };
}]);
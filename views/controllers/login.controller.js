angular.module('ssq')

.controller('loginCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({ method: 'POST', url: '/login', data: $scope.user }).then(function() {
      window.location.href = '#!/profile';
    }, function() {
      $location.path('/login');
    });
  };
}]);
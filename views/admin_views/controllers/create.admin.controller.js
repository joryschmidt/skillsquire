angular.module('admin')

.controller('createAdminCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  $scope.admin = {
    isAdmin: true
  };
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/admin', data: $scope.admin });
    $location.path('/');
  };
}]);
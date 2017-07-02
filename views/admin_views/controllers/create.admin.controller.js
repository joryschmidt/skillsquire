angular.module('admin')

.controller('createAdminCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.admin = {
    isAdmin: true
  };
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/admin', data: $scope.admin });
  };
}]);
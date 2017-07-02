angular.module('admin')

.controller('resourceCtrl', ['$http', '$scope', function($http, $scope) {
  
  $scope.resource = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/admin/resource', data: $scope.resource });
  };
}]);
angular.module('admin')

.controller('resourceCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  
  $scope.resource = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/admin/resource', data: $scope.resource });
    $location.path('/');
  };
}]);
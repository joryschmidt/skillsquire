angular.module('ssq')

.controller('profileCtrl', ['$http', '$scope', '$route', function($http, $scope, $route) {
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $scope.removeRsc = function(id) {
    $http({ method: 'PUT', url: '/user/remove_resource', data: { id: id }});
  };
  
  $http({method: 'GET', url: '/user/profile'}).then(function(query) {
    console.log(query.data);
    $scope.user = query.data.user;
    $scope.resources = query.data.resources;
  });
}]);
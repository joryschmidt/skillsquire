angular.module('ssq')

.controller('profileCtrl', ['$http', '$scope', '$route', function($http, $scope, $route) {
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $scope.removeRsc = function(id) {
    $http({ method: 'PUT', url: '/user/remove_resource', data: { id: id }}).then(function() {
      $scope.resources.forEach(function(rs, i) {
        if (rs._id == id) $scope.resources.splice(i, 1);
      });
    });
  };
  
  $http({method: 'GET', url: '/user/profile'}).then(function(query) {
    console.log(query.data);
    $scope.user = query.data.user;
    $scope.resources = query.data.resources;
  });
}]);
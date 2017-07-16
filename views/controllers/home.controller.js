angular.module('ssq')

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
  $http({ method: 'GET', url: '/resources'}).then(function(query) {
    var resources = query.data;
    
    $scope.resources = resources;
  });
  
  $http({ method: 'GET', url: 'user/profile'}).then(function(query) {
    $scope.user_resources = query.data.resources;
  });
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $scope.addRsc = function(id) {
    $http({ method: 'PUT', url: '/user/add_resource', data: { id: id }});
    var len = $scope.resources.length;
    var rs;
    for (var i=0; i<len; i++) {
      if ($scope.resources[i]._id == id) rs = $scope.resources[i];
    }
    $scope.user_resources.push(rs);
  };
  
  $scope.user_resources = [];
  $scope.userHasResource = function(rs) {
    var len = $scope.user_resources.length;
    for (var i=0; i<len; i++) {
      if (rs._id == $scope.user_resources[i]._id) return true;
    }
    return false;
  };
  
}]);
angular.module('ssq')

.controller('profileCtrl', ['$http', '$scope', '$route', function($http, $scope, $route) {
  
  $scope.customResource = {};
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $scope.removeCustomRsc = function(id) {
    $http({ method: 'PUT', url: '/user/remove_resource', data: { id: id }}).then(function() {
      $scope.custom_resources.forEach(function(rs, i) {
        console.log(rs);
        if (rs._id == id) $scope.custom_resources.splice(i, 1);
      });
    }, function(response) {
      console.log(response);
    });
  };
  
  $scope.roundRating = function(rating) {
    return Math.round(rating);
  };
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/resource/queue', data: $scope.customResource }).then(function(response) {
      
      $scope.custom_resources.unshift(response.data);
      $scope.customResource.name = '';
      $scope.customResource.link = '';
      $scope.customResource.color = '';
      $scope.customResource.description = '';
      
    }, function() {
      console.log("Oh No! Your resource didn't save!");
    });
  };
  
  $http({method: 'GET', url: '/user/profile'}).then(function(query) {
    $scope.user = query.data.user;
    $scope.resources = query.data.resources;
    $scope.customResource.user = query.data.user.username;
    var custom = query.data.user.customResourceList;
    if (!custom) $scope.custom_resources = [];
    else $scope.custom_resources = custom;
  });
}]);
angular.module('ssq')

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
  
  $scope.showDetails = function(event) {
    var prop = event.target.id;
    $scope[prop] ? $scope[prop] = false : $scope[prop] = true;
  };
  
  $http({ method: 'GET', url: '/resources'}).then(function(query) {
    var resources = query.data;
    
    
    $scope.resources = resources;
  });
}]);
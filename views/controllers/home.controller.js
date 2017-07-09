angular.module('ssq')

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
  $http({ method: 'GET', url: '/resources'}).then(function(query) {
    var resources = query.data;
    
    
    $scope.resources = resources;
  });
}]);
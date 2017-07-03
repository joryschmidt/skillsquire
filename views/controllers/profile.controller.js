angular.module('ssq')

.controller('profileCtrl', ['$http', '$scope', '$route', function($http, $scope, $route) {
  $http({method: 'GET', url: '/user'}).then(function(query) {
    $scope.user = query.data;
  });
}]);
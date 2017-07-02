angular.module('ssq')

.controller('dashboardCtrl', ['$http', '$scope', function($http, $scope) {
  $http({method: 'GET', url: '/user'}).then(function(query) {
    $scope.user = query.data;
  });
}]);
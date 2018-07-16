angular.module('admin')

.controller('resourceEditCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  $http.get('/admin/resource/' + $routeParams.id).then(function(res) {
    console.log('success');
    $scope.resource = res.data;
  });
  
  
}]);
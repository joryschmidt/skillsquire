angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  
  var id = $routeParams.id;
  $http.get('/resource/' + id).then(function(query) {
    $scope.resource = query.data;
    $scope.rating = {
      name: query.data.className
    };
  });
  
  
  $scope.submit = function() {
    $http.post('/user/rate', $scope.rating).then(function(response) {
      console.log(response.status);
    });
  };
}]);
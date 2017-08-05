angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', '$rootScope', '$location', function($http, $scope, $routeParams, $rootScope, $location) {
  
  var id = $routeParams.id;
  $http.get('/resource/' + id).then(function(query) {
    $scope.resource = query.data;
    $scope.rating = {
      name: query.data.className,
      rating: $rootScope.rootUser.ratings[$scope.resource.className]
    };
  });
  
  
  $scope.submit = function() {
    $http.post('/user/rate', $scope.rating).then(function(response) {
      console.log(response.status);
      $location.path('/');
    });
  };
}]);
angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', '$rootScope', '$location', function($http, $scope, $routeParams, $rootScope, $location) {
  $scope.data = {};
  
  var id = $routeParams.id;
  $http.get('/resource/' + id).then(function(query) {
    $scope.resource = query.data;
    $scope.data.name = query.data.className;
    if ($rootScope.rootUser) $scope.data.rating = $rootScope.rootUser.ratings[$scope.resource.className];
  });
  
  
  $scope.submit = function() {
    if ($rootScope.rootUser) {
      $http.post('/user/rate', $scope.data).then(function(response) {
        console.log(response.status);
      });
    }
    else {
      window.location.href = '/#!/login';
    }
  };
}]);
angular.module('admin')

.controller('resourceCtrl', ['$http', '$scope', '$location', function($http, $scope, $location) {
  
  $scope.resource = {};
  
  $scope.submit = function() {
    $http({method: 'POST', url: '/admin/resource', data: $scope.resource });
    $location.path('/');
  };
  
  $http.get('/categories').then(function(q) {
    $scope.categories = q.data.categories;
  }, function() {
    console.log('No cats :(');
  });
}])

.controller('deleteResourceCtrl', ['$http', '$scope', function($http, $scope) {
  $http({method:'GET', url: '/resources'}).then(function(query) {
    $scope.resources = query.data;
  });
  
  $scope.goodbye = function(rscId, rscName) {
    if (window.confirm(`Are you sure you want to delete ${rscName}?`)) {
      $http({ method: 'DELETE', url: '/resource/' + rscId });
      window.location.reload();
    }
  };
}]);
angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', function($http, $scope, $routeParams) {
  
  var id = $routeParams.id;
  $http.get('/resource/' + id).then(function(query) {
    console.log(query.data);
    $scope.resource = query.data;
  });
  
  var user = {};
  
  $scope.submit = function() {
    
  };
}]);
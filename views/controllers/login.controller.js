angular.module('ssq')

.controller('loginCtrl', ['$http', '$scope', '$location', '$rootScope', function($http, $scope, $location, $rootScope) {
  $scope.user = {};
  
  $scope.submit = function() {
    $http({ method: 'POST', url: '/login', data: $scope.user }).then(
    function() {
      $rootScope.userLoggedIn = true;
      window.location.href = '#!/profile';
    }, function() {
      window.location.reload();
    });
  };
}]);

(function() {
  var app = angular.module('syntax', ['ngRoute']);
  
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'homeCtrl'
    })
    .when('/javascript', {
      templateUrl: 'templates/javascript.html',
      controller: 'javascriptCtrl'
    })
    .otherwise({ redirectTo: '/' });
  }]);
  
  app.run(['$rootScope', '$http', function($rootScope, $http) {
    $http({method: 'GET', url: '/user'}).then(
    function(query) {
      $rootScope.userLoggedIn = true;
      var user = query.data;
      delete user.password;
      $rootScope.rootUser = user;
      if (user.admin) $rootScope.userIsAdmin = true;
    }, 
    function() {
      $rootScope.userLoggedIn = false;
      $rootScope.userIsAdmin = false;
    });
  }]);
  
  app.directive('javascript', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/javascript.html'
    };
  });
  
  app.directive('python', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/python.html'
    };
  });
  
  app.directive('ruby', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/ruby.html'
    };
  });
  
})();
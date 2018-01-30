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
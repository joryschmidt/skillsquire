(function() {
  var app = angular.module('syntax', ['ngRoute']);
  
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'templates/home',
      controller: 'homeCtrl'
    })
    .when('/javascript', {
      templateUrl: 'templates/javascript/javascript',
      controller: 'javascriptCtrl'
    })
    // redirect to javascript syntax page for now
    .otherwise({ redirectTo: '/javascript' });
  }]);
  
  app.directive('jsHelloWorld', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/javascript/hello-world'
    };
  });
})();
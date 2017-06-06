(function() {
  var app = angular.module('ssq', ['ngRoute']);
  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
      .otherwise({ redirectTo: '/signup' });
  }]);

})();
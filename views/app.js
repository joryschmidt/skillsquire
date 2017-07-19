(function() {
  var app = angular.module('ssq', ['ngRoute']);
  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      })
      .when('/signup', {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      })
      .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      })
      .when('/dashboard', {
        templateUrl: 'templates/dashboard.html',
        controller: 'dashboardCtrl'
      })
      .when('/profile', {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      })
      .otherwise({ redirectTo: '/' });
      
    // $locationProvider.html5Mode(true);
  }]);
  
  app.run(['$rootScope', '$http', function($rootScope, $http) {
    $http({method: 'GET', url: '/user'}).then(
    function(query) {
      $rootScope.userLoggedIn = true;
      var user = query.data;
      if (user.admin) $rootScope.userIsAdmin = true;
    }, 
    function() {
      $rootScope.userLoggedIn = false;
      $rootScope.userIsAdmin = false;
    });
  }]);
  
  app.filter('nospaces', function() {
    return function(txt) {
      return txt.replace(/\s/g, '');
    };
  });
  
})();
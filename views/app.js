(function() {
  var app = angular.module('ssq', ['ngRoute', 'ngAnimate']);
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
      .when('/detail/:id', {
        templateUrl: 'templates/detail.html',
        controller: 'detailCtrl'
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
  
  app.animation('.slide', function() {
  	var NG_HIDE_CLASS = 'ng-hide';
  	return {
  		beforeAddClass: function(element, className, done) {
  			if(className === NG_HIDE_CLASS) {
  				element.slideUp(100, done);
  			}
  		},
  		removeClass: function(element, className, done) {
  			if(className === NG_HIDE_CLASS) {
  				element.hide().slideDown(100, done);
  			}
  		}
  	};
  });
	
	app.directive('resourceTemplate', function() {
	  return {
	    restrict: 'E',
	    templateUrl: 'templates/resource-template.html'
	  };
  });
})();
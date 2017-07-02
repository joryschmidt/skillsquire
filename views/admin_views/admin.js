angular.module('admin', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'templates/admin_home.html',
      controller: 'homeCtrl'
    })
    .when('/resource', {
      templateUrl: 'templates/resource.html',
      controller: 'resourceCtrl'
    })
    .when('/create_admin', {
      templateUrl: 'templates/create_admin.html',
      controller: 'createAdminCtrl'
    })
    .otherwise({ redirectTo: '/' });
}]);
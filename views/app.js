var app = angular.module('ssq', ['ngRoute']);

app.config(['$routeProvider'], function($routeProvider) {
  $routeProvider.
    when('/', {
      templateUrl: 'templates/home.html'
    });
});
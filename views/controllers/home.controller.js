angular.module('ssq')

.controller('homeCtrl', ['$scope', '$http', function($scope, $http) {
  
  // Get all resources from database to display in the home view
  $http.get('/resources').then(function(query) {
    var resources = query.data;
    
    $scope.resources = resources;
    // Populate categories with resources
    $http.get('/categories').then(function(query) {
      var cats = query.data.categories;
      $scope.categories = cats;
      // Populate cat_rscs object with category keys and arrays of resources having that category as values
      $scope.cat_rscs = {};
      for (var i=0; i<cats.length; i++) {
        $scope.cat_rscs[cats[i]] = [];
        for (var j=0; j<resources.length; j++) {
          if (resources[j].categories.indexOf(cats[i]) != -1) $scope.cat_rscs[cats[i]].push(resources[j]);
        }
      }
    });
  });
  
  // Get saved resources from the users profile for the home view
  $http.get('/user/profile').then(function(query) {
    $scope.user_resources = query.data.resources;
  }, function() {
    console.log('No user logged in');
  });
  
  $scope.addRsc = function(id) {
    $http.put('/user/add_resource', { id: id });
    var len = $scope.resources.length;
    var rs;
    for (var i=0; i<len; i++) {
      if ($scope.resources[i]._id == id) rs = $scope.resources[i];
    }
    $scope.user_resources.push(rs);
  };
  
  $scope.user_resources = [];
  $scope.userHasResource = function(rs) {
    var len = $scope.user_resources.length;
    for (var i=0; i<len; i++) {
      if (rs._id == $scope.user_resources[i]._id) return true;
    }
    return false;
  };
  
  $scope.roundRating = function(rating) {
    return Math.round(rating);
  };
  
}]);
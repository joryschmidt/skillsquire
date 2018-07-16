angular.module('admin')

.controller('resourceEditCtrl', ['$http', '$scope', '$routeParams', '$location', function($http, $scope, $routeParams, $location) {
  
  $http.get('/admin/resource/' + $routeParams.id).then(function(res) {
    console.log('success');
    $scope.resource = res.data;
    
    $scope.submit = function() {
      $http({method: 'POST', url: '/admin/resource', data: $scope.resource }).then(function(response) {
        // Having serious problems trying to get Angular to send resource.categories anything but an empty array, so this will have to do for now
        for (var cat in $scope.categories) {
          if ($scope.categories[cat] == true) {
            $http.put('/admin/resource/add_category/' + response.data._id, { cat: cat }).then(function() {
              console.log('Updated category');
            }, function(err) {
              console.log(err);
            });
          }
        }
      }, function(response) {
        console.log(response.data);
      });
      $location.path('/');
    };
    
    $scope.addNewCategory = function() {
      $http.put('/categories/add', { cat: $scope.newCat }).then(function(q) {
        console.log('Added category');
        $scope.categories[$scope.newCat] = false;
        $scope.newCat = null;
      }, function(err) {
        console.log('Error: ', err);
      });
    };
    
    $http.get('/categories').then(function(q) {
      $scope.categories = {};
      
      // this is so the in operator works in the next loop and we don't have to loop through the resource categories array for every checkbox
      var cat_object = {};
      for (var i=0; i<$scope.resource.categories.length; i++) {
        cat_object[$scope.resource.categories[i]] = true;
      }
      
      var categories = q.data.categories;
      var len = categories.length;
      for (var i=0; i<len; i++) {
        $scope.categories[categories[i]] = categories[i] in cat_object;
      }
    }, function() {
      console.log('No cats :(');
    });
    
    console.log($scope.resource);
  });
}]);
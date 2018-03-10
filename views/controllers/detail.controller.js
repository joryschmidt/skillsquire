angular.module('ssq')

.controller('detailCtrl', ['$http', '$scope', '$routeParams', '$rootScope', '$location', function($http, $scope, $routeParams, $rootScope, $location) {
  $scope.data = {};
  
  var button = document.createElement('span');
  button.innerText = 'Added!';
  button.classList.add('btn');
  button.classList.add('btn-danger');
  
  var id = $routeParams.id;
  var user = $rootScope.rootUser;
  
  $http.get('/resource/' + id).then(function(query) {
    $scope.resource = query.data;
    $scope.data.name = query.data.className;
    if (user) $scope.data.rating = $rootScope.rootUser.ratings[$scope.resource.className];
    user.resourceList.forEach(function(res_id, index) {
      if (res_id == id) {
        console.log(res_id, id);
        document.getElementById('add_button').remove();
      }
    });
  });
  
  
  $scope.addToProfile = function() {
    if (user) {
      $http.put('/user/add_resource', { id: id });
      var adder = document.getElementById('add_button');
      adder.parentNode.replaceChild(button, adder);
      $rootScope.rootUser.resourceList.push(id);
    } else {
      window.location.href = '#!/login';
    }
  };
  
  
  $scope.submit = function() {
    if ($rootScope.rootUser) {
      $http.post('/user/rate', $scope.data).then(function(response) {
        console.log(response.status);
      });
    }
    else {
      window.location.href = '/#!/login';
    }
  };
}]);
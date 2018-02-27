angular.module('ssq')

.controller('aboutCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.rsc = {
    name: 'Resource Name',
    className: 'resourcename',
    link: '#!/about',
    description: "This is a resource description",
    long_description: 'This is a longer description of the resource',
    color: 'aqua'
  }; 

}]);
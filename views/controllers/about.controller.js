angular.module('ssq')

.controller('aboutCtrl', ['$http', '$scope', function($http, $scope) {
  $scope.rsc = {
    name: 'Resource Name',
    className: 'resourcename',
    link: '#!/about',
    description: "Here is the quick resource description and average user rating",
    long_description: 'This is a longer description of the resource',
    color: 'aqua',
    rating: 3
  }; 
  
  $scope.roundRating = function(rating) {
    return Math.round(rating);
  };

}]);
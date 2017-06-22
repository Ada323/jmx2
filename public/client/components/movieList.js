angular.module('main-app') // copied mostly from ng-cast

.directive('movieList', function() {
  return {
    scope: {
      movies: '<'
    },
    restrict: 'E',
    controller: function() {
    },
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/movieList.html'
  };
});

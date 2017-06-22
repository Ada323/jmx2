angular.module('main-app')

.controller('MainCtrl', function(searchOMDB, $http) {
  this.user = {};// this is dummy data, change this later
  // this.user;
  this.searchService = searchOMDB

  this.intendedUser;

  $http.get('/sess').then((a,b) => {
    console.log('hello', a,b);
    this.intendedUser = a;
    console.log('intendedUser is now: ', this.intendedUser, 'this.user is ', this.user);
    this.user.username = this.intendedUser.data.username;
    this.user.watched = this.intendedUser.data.watched;
  });

  console.log('current user', this.user);
  console.log('current users watched movies', this.user.watched);


})
.directive('app', function() { // directive name is the HTML tag name REMEMBER THIS
  return {
    scope: {},
    restrict: 'E',
    controller: 'MainCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/app.html'
  };
});

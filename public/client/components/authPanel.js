angular.module('main-app')

.controller('AuthPanelCtrl', function(AuthModel) {
  this.username = '',
  this.password = '',
  this.mode = true,

  this.toggleMode = () => {
    this.mode = !this.mode;
  },

  this.authorize = () => {
    var action = this.mode ? 'signin' : 'signup';

    AuthModel[action](this.username, this.password, (err, apiToken) => {
      if (err) {
        return console.log('authentication error: ', err);
      }
    });
  };
})

.directive('authPanel', function() {
  return {
    restrict: 'E',
    scope: {
      loggedIn: '=',
      apiToken: '='
    },
    controller: 'AuthPanelCtrl',
    controllerAs: 'ctrl',
    bindToController: true,
    templateUrl: 'public/client/templates/authPanel.html'
  };
});

const angular = require('angular');
const demoApp = angular.module('demoApp', [require('angular-route')]);

require('./services')(demoApp);
require('./bears')(demoApp);
require('./auth')(demoApp);

demoApp.config(['$routeProvider', function($rp) {
  $rp
    .when('/bears', {
      templateUrl: 'templates/bears/views/bears_view.html',
      controller: 'BearsController',
      controllerAs: 'bearsctrl'
    })
    // AUTH_EXP: how do the signin/up routes differ and what is their relationship
    // with one another
    // The signin and signup routes use the same template, but use different controllers. The template checks the controller to see if signup is true. If signup is true different fields and text will render within the view.
    // Using the same variable name for controllerAs allows the use of a single template, as it can access both controllers using authctrl.
    // For example authctrl.authenticate will call 2 separate functions depending on which route the user is on.
    .when('/signup', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignUpController',
      controllerAs: 'authctrl'
    })
    .when('/signin', {
      templateUrl: 'templates/auth/views/auth_view.html',
      controller: 'SignInController',
      controllerAs: 'authctrl'
    })
    .otherwise({
      redirectTo: '/signup'
    });
}]);

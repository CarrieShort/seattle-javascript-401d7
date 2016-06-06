var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignUpController', ['$http', '$location',  'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_in_controller
    // signup is true which will change how the auth_view renders the template.
    // this.buttonText is Create New User which changes the button text in auth_view.
    // this.authenticate posts to api/signup
    // the response is mostly the same, but the handlError service is given a different error message.
    this.signup = true;
    this.errors = [];
    this.buttonText = 'Create New User!'
    this.authenticate = function(user) {
      $http.post(baseUrl + '/api/signup', user)
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'Could not create user'));
    };
  }]);
};

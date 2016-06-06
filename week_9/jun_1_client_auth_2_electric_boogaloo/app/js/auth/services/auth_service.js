var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service
    // We're storing the token which is returned from a successful login, or signup. This token is stored in localStorage as token.
    // removeToken - clears token from the service, $http default headers, and localStorage. It also resets the username. Used to log the user out.
    return {
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      // saveToken - saves the token to the service, $http default headers, and LocalStorage. To be called on successful signup or signin.
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      // getToken - retrieves the token first checking the service, if there is no token stored to the service run the saveToken function on the token stored in localStorage. This then will save the localStorage token to the token within the service. This is used for route authorization.
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      // returns a promise, if a username is avaialable on this service the promise resolves with the username
      // if there is no token, the promise rejects and throws an error 'no authToken'
      // Otherwise the promise makes a request to the profile api to retrieve a username. If the request is successful it resolves with the username and stores it to the service. Otherwise it will reject if the request was unsuccessful.
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};

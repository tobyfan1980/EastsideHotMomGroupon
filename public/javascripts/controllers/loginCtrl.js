angular
  .module('eastsideHotMomsGroupon')
  app.controller('LoginCtrl', [
    '$scope', '$rootScope', '$window', 'AUTH_EVENTS', 'AuthService', 'Session',
    function ($scope, $rootScope, $window, AUTH_EVENTS, authService, session) {
      $scope.error_msg = "";
      $scope.login = function (credentials) {
        authService.login(credentials)
          .success(function (data, status, headers, config) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              $scope.setCurrentUser(data);
              session.setUser(data);
              var redirect_login = session.redirect_login;
              session.resetRedirectLogin();
              $window.location.href = redirect_login;
          })
          .error(function (data, status, headers, config) {
              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
              $window.alert("Login failed, please re-enter your credentials")
          });
      };
    }
  ]);

angular
  .module('eastsideHotMomsGroupon')
  .factory('AuthService', [
    '$http', 'Session',
    function ($http, Session) {
      var authService = {};

      authService.login = function (credentials) {
        return $http
              .post('/login', credentials);
              
      };

      return authService;
    }
  ]);

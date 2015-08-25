angular
  .module('eastsideHotMomsGroupon')
  app.controller('LogoutCtrl', [
    '$scope', '$rootScope', '$window', 'AUTH_EVENTS', 'Session',
    function ($scope, $rootScope, $window, AUTH_EVENTS, session) {
      // clear
      $scope.setCurrentUser(null);
      session.clear();
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
      $window.location.href = '#/home';

    }
  ]);

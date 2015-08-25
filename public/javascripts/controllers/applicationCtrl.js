angular
  .module('eastsideHotMomsGroupon')
  .controller('ApplicationCtrl', [
    '$scope', 'USER_ROLES', 'AuthService', 'UserService', 'Session',
    function ($scope, USER_ROLES, AuthService, userService, session) {
      $scope.currentUser = null;
      $scope.userRoles = USER_ROLES;
      //$scope.isAuthorized = AuthService.isAuthorized;

      $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
      };

      $scope.updateCurrentUserFromDB = function(){
        if($scope.currentUser){
          userService.GetById($scope.currentUser._id)
          .success(function(data, status){
            $scope.currentUser = data;
            session.user = $scope.currentUser;
          })
          .error(function(data, status){
            console.log("failed to update current user from db:" + status);
          });
        }

      }
    }
  ]);

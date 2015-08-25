angular
  .module('eastsideHotMomsGroupon')
  .controller('MenuCtrl', [
    '$scope', 'Menus', 'Session',
    function($scope, menus, session){
      //if ($scope.currentUser == null)
      if(session.user == null)
        $scope.menus = menus.default_menu;
      //else if($scope.currentUser.name != 'admin')
      else if(session.user.name != 'admin')
        $scope.menus = menus.user_menu;
      else {
        $scope.menus = menus.admin_menu;
      }
    }
  ]);

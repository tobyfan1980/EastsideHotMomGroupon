angular
  .module('eastsideHotMomsGroupon')
  .controller('UsersCtrl', [
    '$scope', '$window', '$http', 'UserService', 
    function($scope, $window, $http, UserService){
      $scope.title = 'User List';
      $scope.loading = true;
      $scope.sortType     = 'user.email'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.searchOrder   = '';     // set the default search/filter term
      $scope.currentPage = 0;
      $scope.pageSize = 50;
      $scope.orders = [];
      UserService.GetAll()
  			.success(function(user_data) {
  				$scope.users = user_data;
          $scope.loading = false;
  			})
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to get user information")
        });

      $scope.setCurrentPage = function(currentPage) {
        $scope.currentPage = currentPage;
      };
      $scope.getNumberAsArray = function (num) {
        return new Array(num);
      };

      $scope.numberOfPages = function() {
        return Math.ceil($scope.orders.length/ $scope.pageSize);
      };

      
    }
  ]);

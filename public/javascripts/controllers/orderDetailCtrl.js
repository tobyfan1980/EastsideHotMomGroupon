angular
  .module('eastsideHotMomsGroupon')
  .controller('OrderDetailCtrl', [
    '$scope', '$stateParams', 'Deals', 'Orders',
    function($scope, $stateParams, Deals, Orders){
      $scope.order = {};
      $scope.deal = {};
      $scope.loading = true;

      Orders.getById($stateParams.orderId)
  			.success(function(data) {
  				$scope.order = data;

          $scope.order.date_str = new Date($scope.order.date).toDateString()

          Deals.getById($scope.order.deal)
      			.success(function(data) {
      				$scope.deal = data;

              $scope.loading = false;
            });
        });
    }

  ]);

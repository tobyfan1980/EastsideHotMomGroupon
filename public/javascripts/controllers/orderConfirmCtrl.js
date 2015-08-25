angular
  .module('eastsideHotMomsGroupon')
  .controller('OrderConfirmCtrl', [
    '$scope', '$stateParams', '$window', 'Deals', 'Orders', 'Session',
    function($scope, $stateParams, $window, Deals, orders, session){
      $scope.order = session.completedOrder;

      Deals.getById(session.completedOrder.deal)
  			.success(function(data) {
  				$scope.deal = data;
        });
    }

  ]);

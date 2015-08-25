angular
  .module('eastsideHotMomsGroupon')
  .controller('HomeCtrl', [
    '$scope', '$http', '$state', 'Deals', 'Orders',
    function($scope, $http, $state, Deals, Orders){
      $scope.title = 'Deal List';
      $scope.loading = true;
      // GET =====================================================================
  		// when landing on the page, get all Deals and show them
  		// use the service to get all the deals
  		Deals.get()
  			.success(function(data) {
  				$scope.deals = data;
  				$scope.loading = false;

          $scope.deals.forEach(function(deal){
            Deals.getStatisticsPerDeal(deal._id)
            .success(function(statistics, status){
              deal.total_order_units = statistics.total_order_units;
            });
          });
  			});

      $scope.gotoDeal = function(deal){
        console.log('go to deal ');
        if ($scope.currentUser && $scope.currentUser.user_type=='admin'){
          console.log("go to admin deal page");
          $state.go('deal_admin', {dealId: deal._id});
        }
        else if ($scope.currentUser && $scope.currentUser.user_type=='distributor'){
          console.log("go to distributor deal page");
          $state.go('deal_admin', {dealId: deal._id});
        }
        else{
          console.log("go to customer deal page");
          $state.go('deal_customer', {dealId: deal._id});
        }

      };

    }
  ]);

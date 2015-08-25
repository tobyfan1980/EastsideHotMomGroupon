angular
  .module('eastsideHotMomsGroupon')
  .controller('DealCustomerCtrl', [
    '$scope', '$stateParams', '$state', '$window', 'Deals', 'Orders', 'PickupLocation', 'Session',
    function($scope, $stateParams, $state, $window, Deals, Orders, PickupLocation, session){

      var GetPickupLocations = function(){
        PickupLocation.GetAll()
        .success(function(locations, status){
          $scope.pickupLocations = locations;
          if(locations.length){
            $scope.order.pickup_location = locations[0]._id;
          }

      
        })
        .error(function(data, status){
          console.log(status);
          $windows.alert("failed to get pickup locations");
        });
      };

      $scope.err_msg = "";
      $scope.loading = true;
      if(session.pendingOrder)
        $scope.order = session.pendingOrder;

      $scope.order = {quantity: 1, pickup_location: null};

      GetPickupLocations();
      
      Deals.getById($stateParams.dealId)
  			.success(function(data) {
  				$scope.deal = data;

          var end_date = new Date(data.end_date);
          $scope.end_date_str = end_date.toDateString();

          Deals.getStatisticsPerDeal($stateParams.dealId)
            .success(function(stats, status){
              $scope.deal.total_order_units = stats.total_order_units;
              if($scope.deal.total_order_units / $scope.deal.total_quantity > 0.75)
                $scope.deal.is_almost_gone = true;
              else {
                $scope.deal.is_almost_gone = false;
              }
            });

          $scope.loading = false;
        });

      $scope.placeOrder = function(){
        $scope.order.deal = $scope.deal._id;
        if(session.user == null){
          session.setPendingOrder($scope.order);
          session.setRedirectLogin($window.location.href);
          //$window.location.href = "#/login";
          $state.go('login');
        }
        else{
          Deals.getStatisticsPerDealPerUser($scope.deal._id, session.user._id)
          .success(function(stats, status){
            if(stats.order_units + $scope.order.quantity > $scope.deal.max_per_user)
            {
              var upperbound = $scope.deal.max_per_user - stats.order_units;
              $window.alert("You have ordered " + stats.order_units + ", you can only order " + upperbound + " more.");
            }
            else {
              $scope.order.user = $scope.currentUser._id;
              //order_info.deal = $scope.deal._id;

              $scope.order.date = Date.now();
              $scope.order.status = "pending";
              Orders.create($scope.order)
              .success(function(data, status, headers, config){
                console.log(data);
                console.log(status);
                console.log(headers);
                console.log(config);
                session.setPendingOrder(null);

                session.setCompletedOrder(data);
                $scope.msg = "order placed " + data._id;

                $window.location.href = '#/order_confirm';

              })
              .error(function(data, status, headers, config){
                console.log(status);
                $scope.err_msg = status
              });
            }
          });

        }
      };
    }
  ]);

angular
  .module('eastsideHotMomsGroupon')
  .controller('DealAdminCtrl', [
    '$scope', '$stateParams', '$window', '$state', '$http', 'Deals', 'Orders', 'PickupLocation', 'Session',
    function($scope, $stateParams, $window, $state, $http, Deals, Orders, PickupLocation, session){
      $scope.loading = true;
      $scope.sortType     = 'deal.date'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.searchOrder   = '';     // set the default search/filter term
      $scope.currentPage = 0;
      $scope.pageSize = 50;
      $scope.orders = [];
 
      $scope.order_status = ['pending', 'arrived', 'ready_for_pickup', 'delivered'];
      $scope.pickup_msg = "";
      $scope.use_distributor_address = true;

      $scope.deal_display = {};

      GetDealOrders = function(parameters){
        console.log("get orders of the deal");
        Orders.get(parameters)
        .success(function(order_data, status) {

          console.log("got orders");
          console.log(order_data);

          $scope.orders = order_data;
          //console.log($scope.orders);
          $scope.orders.forEach(function(order){
            order.expense = order.quantity * $scope.deal.price / 100;
            order.date_str = new Date(order.date).toDateString();
            order.old_status = order.status;

          });
          $scope.loading = false;
        });
      }

      if (!$scope.currentUser || $scope.currentUser.user_type == 'customer')
      {
        $window.alert("you are not authorized to view this page, please login using admin user");
        return;
      }

      UpdateWebDataBind = function(){
          var end_date = new Date($scope.deal.end_date);
          $scope.deal_display.end_date_str = end_date.toDateString();

          //compute the duration
          var start_date = new Date($scope.deal.start_date);

          $scope.deal_display.duration = Math.round((end_date - start_date) / 3600 / 24 / 1000);

          //for update deal info
          $scope.deal_display.total_quantity = $scope.deal.total_quantity;
      };

      console.log('get deal info');
      Deals.getById($stateParams.dealId)
  			.success(function(data) {
  				$scope.deal = data;

          UpdateWebDataBind();

          console.log('get deal stats');
          Deals.getStatisticsPerDeal($stateParams.dealId)
          .success(function(stats, status){
            $scope.deal_display.total_order_units = stats.total_order_units;
            if($scope.deal.total_order_units / $scope.deal.total_quantity > 0.75)
              $scope.deal_display.is_almost_gone = true;
            else {
              $scope.deal_display.is_almost_gone = false;
            }
          })
          .error(function(data, status){
            console.log(status);
          });

          if($scope.currentUser.user_type == 'distributor'){
            PickupLocation.GetByUserId($scope.currentUser._id)
            .success(function(data, status){
              console.log("got pickup location of distributor " + $scope.currentUser.name);
              console.log(data);

              if(data && data.length > 0){
                $scope.currentUser.pickup_location = data[0];

                var deal_params = {dealId: $stateParams.dealId, locationId: $scope.currentUser.pickup_location._id};
                console.log("get deal order of distributor:" );
                console.log(deal_params);
                GetDealOrders(deal_params);
              }
              else{
                $window.alert("You are a distributor, but system failed to get your pickup_location, there will be no orders shown");
              }
            })
            .error(function(data, status){
              $window.alert("You are a distributor, but system failed to get your pickup_location, there will be no orders display in this page");
            });
          }
          else{
            GetDealOrders({dealId: $stateParams.dealId});
          }
        });

      $scope.modifyDeal = function(){

        if ($scope.deal_display.total_quantity < $scope.deal.total_order_units){
          $window.alert("You are changing the total quantity less than existing orders")
          return

        }
        var end_date = new Date($scope.deal.start_date);
        console.log("start date");
        console.log($scope.deal.start_date);
        console.log("duration");
        console.log($scope.deal_display.duration);
        end_date.setDate(end_date.getDate() + $scope.deal_display.duration);

        var new_deal_info = {_id: $scope.deal._id, 
          total_quantity: $scope.deal_display.total_quantity,
          end_date: end_date
        };
        console.log("new deal info");
        console.log(new_deal_info);

        Deals.update(new_deal_info)
        .success(function(data, status){
          $scope.deal = data;
          UpdateWebDataBind();
        })
        .error(function(data, status){
          $window.alert("failed to update deal");
          console.log(status);
        });
      };

      $scope.changeOrderStatus = function(order){
        console.log("change order status to " + order.status);
        Orders.changeStatus(order._id, order.status)
        .success(function(data, status){
          order.old_status = order.status;
        })
        .error(function(data, status){
          order.status = order.old_status;
          $window.alert("failed to change order status, please try later");

        });
      };

      $scope.notifyArrived = function(){
        Deals.notifyArrived($scope.deal._id)
        .success(function(data, status){
          $scope.orders.forEach(function(order){
            order.status = 'arrived';
          });
          $window.alert("Deal goods arrived info has been sent to distributors");
        })
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to notify deal stuff has arrived");
        });
      };

      $scope.notifyReadyForPickup = function(){
        console.log($scope.pickup_msg);
        Deals.notifyReadyForPickup($scope.deal._id, $scope.currentUser.pickup_location._id, $scope.use_distributor_address, $scope.pickup_msg)
        .success(function(data, status){
          $scope.orders.forEach(function(order){
            order.status = 'ready_for_pickup';
          });
          $window.alert("Pickup notification has been sent to customers");
        })
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to notify deal stuff is ready for pickup");
        });
      };

      $scope.setCurrentPage = function(currentPage) {
        $scope.currentPage = currentPage;
      };
      $scope.getNumberAsArray = function (num) {
        return new Array(num);
      };

      $scope.numberOfPages = function() {
        return Math.ceil($scope.orders.length/ $scope.pageSize);
      };

      $scope.goto_order = function(order_id){
        $window.location.href = '#/orders/' + order_id;
      };

    }
  ]);

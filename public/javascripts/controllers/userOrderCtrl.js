angular
  .module('eastsideHotMomsGroupon')
  .controller('userOrderCtrl', [
    '$scope', '$window', '$http', 'Deals', 'Orders', 'Session',
    function($scope, $window, $http, Deals, Orders, session){
      $scope.title = 'Order History';
      $scope.loading = true;
      $scope.sortType     = 'deal.date'; // set the default sort type
      $scope.sortReverse  = true;  // set the default sort order
      $scope.searchOrder   = '';     // set the default search/filter term
      $scope.currentPage = 0;
      $scope.pageSize = 50;
      $scope.orders = [];
      Orders.getByUserId(session.user._id)
  			.success(function(order_data) {
  				$scope.orders = order_data;
          //console.log($scope.orders);
          $scope.orders.forEach(function(order){
            Deals.getById(order.deal)
        			.success(function(deal_data) {
        			  order.deal = deal_data;
                order.expense = order.quantity * deal_data.price / 100;

                order.date_str = new Date(order.date).toDateString()

              });
          });
  				$scope.loading = false;
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

      $scope.goto_order = function(order_id){
        $window.location.href = '#/orders/' + order_id;
      };

    }
  ]);

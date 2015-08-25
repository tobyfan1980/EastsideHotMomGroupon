angular
  .module('eastsideHotMomsGroupon')
  .controller('NewDealCtrl', [
    '$scope', '$window', 'Deals', 'Session',
    function($scope, $window, Deals, session){
      $scope.msg = 'ready';
      $scope.error_msg = '';
      console.log(session.user);
      if (session.user.name != 'admin'){
        $scope.error_msg = 'this is not admin, please login using admin';
      }
      $scope.deal_info = {
        duration: 7,
        category: "Fruit",
        max_per_user: 10,
        total_quantity: 100
      };
      $scope.create_deal = function(){
        $scope.deal_info.price = $scope.deal_info.price * 100;
        $scope.deal_info.start_date = new Date();
        var end_date = new Date($scope.deal_info.start_date);
        end_date.setDate($scope.deal_info.start_date.getDate() + $scope.deal_info.duration + 1);
        $scope.deal_info.end_date = end_date;

        Deals.create($scope.deal_info)
        .success(function(data, status, headers, config){
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          $scope.msg = "deal created " + data._id;

          $window.location.href = '#/home';

        })
        .error(function(data, status, headers, config){
          console.log(status);
          $scope.error_msg = status;
        });

      };
    }
  ]);

angular
  .module('eastsideHotMomsGroupon')
  .controller('RegisterCtrl', [
    '$scope', '$window', 'UserService', 'AddressService',
    function($scope, $window, userService, addressService){
      $scope.msg = 'ready';
      $scope.error_msg = '';
      $scope.user_info = {
        name: "",
        email: "",
        password: "",
        wechat_id: "",
        phone: "",
        user_type: "customer",
        distributor: false
      };
      $scope.address = {
        street: "",
        city: "",
        zipcode: "",
        state: "",
        country: "",
        is_default: true
      };

      $scope.register = function(){
        console.log("create user");
        if($scope.user_info.name=='admin'){
          $scope.user_info.user_type = 'admin';
        }
        else if ($scope.user_info.distributor){
          $scope.user_info.user_type = 'distributor';
        }

        userService.Register($scope.user_info)
        .success(function(user_data, status, headers, config){
          console.log(user_data);
          console.log(status);
          $scope.msg = "user registered";

          // create address
          console.log('create address');
          $scope.address.user = user_data._id;
          addressService.Create($scope.address)
          .success(function(address_data, status, headers, config){
            $window.location.href = '#/login';
          })
          .error(function(data, status, headers, config){
            console.log(status);
            $scope.error_msg = "failed to add address, please login and add again: " + status
          });
        })
        .error(function(data, status, headers, config){
          console.log(status);
          $scope.error_msg = "failed to register user: " + status;
        });

      };
    }
  ]);

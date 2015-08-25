angular
  .module('eastsideHotMomsGroupon')
  .controller('ProfileCtrl', [
    '$scope', '$window', '$http', 'Session', 'AddressService',
    function($scope, $window, $http, session, addressService){
      $scope.msg = 'ready';
      $scope.error_msg = '';
      
      $scope.updateCurrentUserFromDB();

      console.log($scope.currentUser);
      console.log($scope.currentUser.addresses);

      $scope.user_pwd = {
        old_password: "",
        new_password: "",
        confirm_password: ""
      };

      $scope.update_profile = function(){
        //verify password
        if (($scope.user_pwd.new_password != "" || $scope.user_pwd.confirm_password != "")
            && $scope.user_pwd.new_password != $scope.user_pwd.old_password){
            $scope.error_msg = "new password and its confirm not match";
            return;
          }

        if(session.user.addresses.length == 0)
        {
          session.user.addresses.push($scope.user_address);
        }
        else {
          session.user.addresses[0] = $scope.user_address;
        }

        var user_info = session.user;
        if ($scope.user_pwd.new_password != "" || $scope.user_pwd.confirm_password != ""){
          user_info.update_user_pwd = $scope.user_pwd;
        }


        userService.Update(user_info)
        .success(function(data, status, headers, config){
          console.log(data);
          console.log(status);
          console.log(headers);
          console.log(config);
          $scope.msg = "user profile updated";

        })
        .error(function(data, status, headers, config){
          console.log(status);
          $scope.error_msg = status
        });

      };

      $scope.createAddress = function(){
        $window.location.href = '#/create_address';
      };
      $scope.editAddress = function(address){
        session.editing_address = address;
        $window.location.href = '#/update_address';
      };

      $scope.setDefaultAddress = function(default_address){
        //clear current default
        var is_default_removed = false;
        var is_default_found = false;
        for(i=0; i<$scope.currentUser.addresses.length;i++){
          var address = $scope.currentUser.addresses[i];
          if(address.is_default)
          {
            is_default_found = true;
            address.is_default = false;
            addressService.Update(address)
            .success(function(data, status){
              console.log("default address removed")
              is_default_removed = true;

              default_address.is_default = true;
              addressService.Update(default_address)
              .success(function(data, status){
                console.log('new default has been set');
                $scope.updateCurrentUserFromDB();
              })
              .error(function(data, status){
                $scope.error_msg = "failed to set default address"
              });

            })
            .error(function(data, status){
              $scope.error_msg = "failed to remove default from address: " + status;
            });

            break;
          }
        }
      };

      $scope.deleteAddress = function(address){
        console.log('delete address');
        addressService.delete(address)
        .success(function(data, status){
          $scope.msg = "user address deleted";
          $scope.updateCurrentUserFromDB();


        })
        .error(function(data, status){
          console.log(status);
          $scope.error_msg = "failed to delete address: " + status;
        });
      };
    }
  ]);

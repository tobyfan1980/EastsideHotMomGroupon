angular
  .module('eastsideHotMomsGroupon')
  .controller('CreateAddressCtrl', [
    '$scope', '$window', '$http', 'Session', 'AddressService',
    function($scope, $window, $http, session, addressService){
      $scope.msg = 'ready';
      $scope.error_msg = '';

      $scope.address = {
        street: "",
        city: "",
        zipcode: "",
        state: "",
        country: "",
      };

      $scope.setAddress = function(){
        // create address
        $scope.address.user = $scope.currentUser._id;
        addressService.Create($scope.address)
        .success(function(address_data, status, headers, config){

          $scope.updateCurrentUserFromDB();
          $window.location.href = '#/profile';
        })
        .error(function(data, status, headers, config){
          console.log(status);
          $scope.error_msg = "failed to add address: " + status
        });
      };

    }
  ]);

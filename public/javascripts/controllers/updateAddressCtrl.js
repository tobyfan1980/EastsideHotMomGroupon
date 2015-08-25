angular
  .module('eastsideHotMomsGroupon')
  .controller('UpdateAddressCtrl', [
    '$scope', '$window', '$http', 'Session', 'AddressService',
    function($scope, $window, $http, session, addressService){
      $scope.msg = 'ready';
      $scope.error_msg = '';

      $scope.address = session.editing_address;

      $scope.setAddress = function(){
        // create address
        $scope.address.user = $scope.currentUser._id;
        addressService.Update($scope.address)
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

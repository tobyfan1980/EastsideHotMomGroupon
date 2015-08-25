angular
  .module('eastsideHotMomsGroupon')
  .controller('SettingsCtrl', [
    '$scope', '$window', 'PickupLocation', 'UserService', 'Session',
    function($scope, $window, PickupLocation, userService, session){
      $scope.newLocation = {
        community: "",
        user: "",
      };

      $scope.distributors = [];

      var GetPickupLocations = function(){
        PickupLocation.GetAll()
        .success(function(locations, status){
          $scope.pickupLocations = locations;
        })
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to get pickup locations");
        });
      };

      userService.GetByType("distributor")
  			.success(function(users) {
  				$scope.distributors = users;
          GetPickupLocations();

        })
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to get distributor list, cannot add new pickup location");
        });

      $scope.createLocation = function(){
        //add to db
        PickupLocation.Create($scope.newLocation)
        .success(function(location, status){
          console.log(location);
          $scope.pickupLocations.push(location);
        })
        .error(function(data, status){
          console.log(status);
          $windows.alert("failed to add new pickup location");
        });
      };

      $scope.deleteLocation = function(location){
        PickupLocation.Delete(location)
        .success(function(location_data, status){
          console.log(location_data);
          GetPickupLocations();
        })
        .error(function(data, status){
          console.log(status);
          $window.alert("failed to delete pickup location");

        })
      };
    }

  ]);

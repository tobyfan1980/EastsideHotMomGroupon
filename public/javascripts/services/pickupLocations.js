angular
  .module('eastsideHotMomsGroupon')
  .factory('PickupLocation', ['$http', function($http){
    var pickupLocationService = {};
    pickupLocationService.GetAll = function(){
      return $http.get('/pickups');
    };

    pickupLocationService.GetByUserId = function(user_id){
      return $http.get('/pickups?userId=' + user_id);
    };

    pickupLocationService.Create = function(pickupLocation_info){
      return $http.post('/pickups', pickupLocation_info);
    };

    pickupLocationService.Delete = function(pickupLocation_info){
      return $http.delete('/pickups/' + pickupLocation_info._id);
    };

    return pickupLocationService;
  }]);

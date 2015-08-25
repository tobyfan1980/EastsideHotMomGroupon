angular
  .module('eastsideHotMomsGroupon')
  .factory('AddressService', ['$http', function($http){
    var addressService = {};

    addressService.GetByUserId = function(userId){
      return $http.get('/addresses?userId=' + userId)
    };

    addressService.Create = function(address_info){
      return $http.post('/addresses', {'action': 'create', 'address_info': address_info})

    };
    addressService.Update = function(address_info){
      return $http.post('/addresses', {'action': 'update', 'address_info': address_info});
    };

    addressService.delete = function(address_info){
      return $http.delete('/addresses/' + address_info._id);
    };
    return addressService;
  }]);

angular
  .module('eastsideHotMomsGroupon')
  .factory('Deals', ['$http',function($http) {
    return {
      get : function() {
        return $http.get('/deals');
      },
      getById : function(dealId) {
        return $http.get('/deals/'+dealId);
      },
      create : function(dealData) {
        return $http.post('/deals', {action: 'create', 'deal_info': dealData});
      },
      update : function(dealData) {
        return $http.post('/deals', {action: 'update', 'deal_info': dealData});
      },
      delete : function(id) {
        return $http.delete('/deals/' + id);
      },
      getStatisticsPerDeal : function(dealId) {
        return $http.get('/stats?dealId=' + dealId);
      },
      getStatisticsPerDealPerUser : function(dealId, userId) {
        return $http.get('/stats?dealId=' + dealId + "&userId=" + userId);
      },
      notifyArrived: function(dealId){
        return $http.post('/deals/notifyArrived', {id: dealId});
      },
      notifyReadyForPickup: function(dealId, locationId, useDistributorAddress, pickupMsg){
        return $http.post('/deals/notifyReadyForPickup', 
                          {id: dealId, 
                            pickup_location: locationId, 
                            use_distributor_address: useDistributorAddress, 
                            pickup_msg: pickupMsg});
      }
    }
  }]);

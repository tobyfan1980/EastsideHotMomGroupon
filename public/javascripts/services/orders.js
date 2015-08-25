angular
  .module('eastsideHotMomsGroupon')
  .factory('Orders', ['$http',function($http) {
    return {
      get : function(parameters) {
        var url_parameters = [];
        if(parameters.hasOwnProperty('dealId'))
          url_parameters.push('dealId=' + parameters.dealId);
        if(parameters.hasOwnProperty('userId'))
          url_parameters.push('userId=' + parameters.userId);
        if(parameters.hasOwnProperty('locationId'))
          url_parameters.push('locationId=' + parameters.locationId);

        console.log(url_parameters);
        if(url_parameters.length == 0)
          return $http.get('/orders');
        else {
          var get_str = '/orders?' + url_parameters.join('&');
          console.log(get_str);
          return $http.get(get_str);
        }
      },
      getById : function(orderId) {
        return $http.get('/orders/'+orderId);
      },
      getByDealId: function(dealId){
        return $http.get('/orders?dealId=' + dealId);
      },
      getByUserId: function(userId) {
        return $http.get('/orders?userId='+userId);
      },
      create : function(orderData) {
        return $http.post('/orders', {'action': 'create', 'order': orderData});
      },
      delete : function(id) {
        return $http.delete('/orders/' + id);
      },
      changeStatus : function(order_id, new_status){
        return $http.post('/orders', {'action': 'update', 'order': {id:order_id, status: new_status}});
      }
    }
  }]);

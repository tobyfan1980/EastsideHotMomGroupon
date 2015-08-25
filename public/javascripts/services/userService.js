angular
  .module('eastsideHotMomsGroupon')
  .factory('UserService', ['$http', function($http){
    var userService = {};
    userService.GetAll = function(){
      return $http.get('/users');
    };

    userService.GetByEmail = function(email){
      return $http.get('/users?email=' + email);
    };

    userService.GetById = function(userId){
      return $http.get('/users/' + userId);
    };

    userService.GetByType = function(user_type){
      return $http.get('/users?user_type=' + user_type);
    };

    userService.Register = function(user_info){
      return $http.post('/users', {'action': 'create', 'user_info': user_info});

    };
    userService.Update = function(user_info){
      return $http.post('/users', {'action': 'update', 'user_info': user_info});
    };
    return userService;
  }]);

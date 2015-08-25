angular
  .module('eastsideHotMomsGroupon')
  .factory('Session', function () {
    var session = {
      user: null,
      pendingOrder: null,
      completedOrder: null,
      redirect_login: "#/home"
    };
    session.resetRedirectLogin = function(){
      session.redirect_login = "#/home";
    };
    session.clear = function(){
      session.user=null;
      session.pendingOrder=null;
      session.completedOrder = null;
      session.resetRedirectLogin();
    };
    session.setUser = function(u){
      session.user = u;
    };
    session.setPendingOrder = function(o){
      session.pendingOrder = o;
    };
    session.setCompletedOrder = function(o){
      session.completedOrder = o;
    };

    session.setRedirectLogin = function(link){
      session.redirect_login = link;
    }

    return session;

  });

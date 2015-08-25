var app = angular.module('eastsideHotMomsGroupon', ['ui.router'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'HomeCtrl'
      })
      .state('about', {
        url: '/about',
        templateUrl: '/about.html'
      })
      .state('contact', {
        url: '/contact',
        templateUrl: '/contact.html'
      })
      .state('register', {
        url: '/register',
        templateUrl: '/register.html',
        controller: 'RegisterCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login.html',
        controller: 'LoginCtrl'
      })
      .state('deal_customer', {
        url: '/deals/:dealId',
        templateUrl: '/deal_customer.html',
        controller: 'DealCustomerCtrl'
      })
      .state('deal_admin', {
        url: '/deals_admin/:dealId',
        templateUrl: '/deal_admin.html',
        controller: 'DealAdminCtrl'
      })
      .state('new_deal', {
        url: '/new_deal',
        templateUrl: '/new_deal.html',
        controller: 'NewDealCtrl'
      })
      .state('order', {
        url: '/orders',
        templateUrl: '/customer_orders.html',
        controller: 'userOrderCtrl'
      })
      .state('order_by_id', {
        url: '/orders/:orderId',
        templateUrl: '/order_detail.html',
        controller: 'OrderDetailCtrl'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: '/login.html',
        controller: 'LogoutCtrl'
      })
      .state('order_confirm', {
        url: '/order_confirm',
        templateUrl: '/order_confirm.html',
        controller: 'OrderConfirmCtrl'
      })
      .state('create_address', {
        url: '/create_address',
        templateUrl: '/config_address.html',
        controller: 'CreateAddressCtrl'
      })
      .state('update_address', {
        url: '/update_address',
        templateUrl: '/config_address.html',
        controller: 'UpdateAddressCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('settings', {
        url: '/settings',
        templateUrl: '/settings.html',
        controller: 'SettingsCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: '/users.html',
        controller: 'UsersCtrl'
      })

    $urlRouterProvider.otherwise('/home');
  }
])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'customer'
})

angular
  .module('eastsideHotMomsGroupon')
  .factory('Menus', ['$http', function($http){
    return {
      default_menu: [
        {title: 'Home', link: '#/home', type: "link"},
        {title: 'About', link: '#/about', type: "link"},
        {title: 'Contact', link: '#/contact', type: "link"},
        {title: 'Account', link: '#', type: "dropdown",
         menus: [
           {
             title: 'Signup', link: '#/register'
           },
           {
             title: 'Login', link: '#/login'
           }
         ]
        },
      ],
      user_menu: [
        {title: 'Home', link: '#/home', type: "link"},
        {title: 'About', link: '#/about', type: "link"},
        {title: 'Contact', link: '#/contact', type: "link"},
        {title: 'Account', link: '#', type: "dropdown",
         menus: [
           {
             title: 'Orders', link: '#/orders', type: "link"
           },
           {
             title: 'Profile', link: '#/profile', type: "link"
           },
           {
             title: 'Logout', link: '#/logout', type: "link"
           }
         ]
        },
      ],
      admin_menu: [
        {title: 'Home', link: '#/home', type: "link"},
        {title: 'About', link: '#/about', type: "link"},
        {title: 'Contact', link: '#/contact', type: "link"},
        {title: 'Account', link: '#', type: "dropdown",
         menus: [
           {
             title: 'Create Deal', link: '#/new_deal', type: "link"
           },
           {
             title: 'Settings', link: '#/settings', type: "link"
           },
           {
             title: 'Users', link: '#/users', type: "link"
           },
           {
             title: 'Logout', link: '#/logout', type: "link"
           }
         ]
        },
      ],
      distributor_menu: [
        {title: 'Home', link: '#/home', type: "link"},
        {title: 'About', link: '#/about', type: "link"},
        {title: 'Contact', link: '#/contact', type: "link"},
        {title: 'Account', link: '#', type: "dropdown",
         menus: [
           {
             title: 'Logout', link: '#/logout', type: "link"
           }
         ]
        },
      ],
    }
  }]);

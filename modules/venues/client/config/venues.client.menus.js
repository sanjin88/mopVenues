(function () {
  'use strict';

  angular
    .module('venues')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Venues',
      state: 'venues',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'venues', {
      title: 'List Venues',
      state: 'venues.list',
      roles: ['*']
    });
  }
}());

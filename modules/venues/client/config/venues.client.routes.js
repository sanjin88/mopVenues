(function () {
  'use strict';

  angular
    .module('venues.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('venues', {
        abstract: true,
        url: '/venues',
        template: '<ui-view/>'
      })
      .state('venues.list', {
        url: '',
        templateUrl: '/modules/venues/client/views/list-venues.client.view.html',
        controller: 'VenuesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Venues List'
        }
      })
      .state('venues.view', {
        url: '/:venueId',
        templateUrl: '/modules/venues/client/views/view-venue.client.view.html',
        controller: 'VenuesController',
        controllerAs: 'vm',
        resolve: {
          venueResolve: getVenue
        },
        data: {
          pageTitle: 'Venue {{ venueResolve.title }}'
        }
      });
  }

  getVenue.$inject = ['$stateParams', 'VenuesService'];

  function getVenue($stateParams, VenuesService) {
    return VenuesService.get({
      venueId: $stateParams.venueId
    }).$promise;
  }
}());

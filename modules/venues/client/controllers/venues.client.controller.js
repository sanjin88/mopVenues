(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenuesController', VenuesController);

  VenuesController.$inject = ['$scope', 'venueResolve', 'Authentication'];

  function VenuesController($scope, venue, Authentication) {
    var vm = this;

    vm.venue = venue;
    vm.authentication = Authentication;

  }
}());

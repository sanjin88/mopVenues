(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenuesListController', VenuesListController);

  VenuesListController.$inject = ['VenuesService'];

  function VenuesListController(VenuesService) {
    var vm = this;

    vm.venues = VenuesService.query();
  }
}());

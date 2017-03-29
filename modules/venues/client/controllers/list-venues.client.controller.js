(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenuesListController', VenuesListController);

  VenuesListController.$inject = ['VenuesService', 'FourSquareService'];

  function VenuesListController(VenuesService, FourSquareService) {
    var vm = this;

    FourSquareService.getVenuesFromFourSquare().then(function (venues) {
      console.log(venues)
      vm.venues = venues;
    });

    function loadMap() {
      NgMap.getMap().then(function (resp) {
        console.log(resp)
      })
    }

  }
}());

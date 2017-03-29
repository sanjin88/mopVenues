(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenuesListController', VenuesListController);

  VenuesListController.$inject = ['VenuesService', 'VenuesListService', "LocationService"];

  function VenuesListController(VenuesService, VenuesListService, LocationService) {
    var vm = this;

    VenuesListService.getVenues().then(function (venues) {
      vm.venues = venues;
      console.log(venues)
      vm.nearest = true;
      loadMap();
    });

    function loadMap() {
      LocationService.getLocation().then(function (response) {
        vm.map = {
          center: [response.latitude, response.longitude]
        }
        vm.map.show = true;
        console.log(response)
      });
    }

  }
}());

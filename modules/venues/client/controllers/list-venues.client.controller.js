(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenuesListController', VenuesListController);

  VenuesListController.$inject = ['VenuesService', 'FourSquareService', "LocationService"];

  function VenuesListController(VenuesService, FourSquareService, LocationService) {
    var vm = this;

    FourSquareService.getVenuesFromFourSquare().then(function (venues) {
      console.log(venues)
      vm.venues = venues;
      loadMap();
    });

    function loadMap() {
LocationService.getLocation().then(function(response){
  vm.map = {
    center :[response.latitude , response.longitude]
  }
  vm.map.show = true;
console.log(response, "sjakjs")
});
    }

  }
}());

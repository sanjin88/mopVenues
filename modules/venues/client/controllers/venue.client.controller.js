(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenueClientDirectiveController', VenueClientDirectiveController);

  VenueClientDirectiveController.$inject = ['VenuesService'];

  function VenueClientDirectiveController(VenuesService) {
    var vm = this;

  }

}());
(function () {
  'use strict';

  angular
    .module('venues')
    .controller('VenueClientDirectiveController', VenueClientDirectiveController);

  VenueClientDirectiveController.$inject = ['VenuesService'];

  function VenueClientDirectiveController(VenuesService) {
    var vm = this;

    vm.tweetAbout = tweetAbout;

    function tweetAbout($event) {

      //Get click position
      var e = $event
      var x = e.screenX - 100;
      var y = e.screenY - 150;
      
      var message = vm.venue.name + ' in ';
      if (vm.venue.location.address) {
        message = message + vm.venue.location.address + ' ';
      }
      if (vm.venue.location.city) {
        message = message + vm.venue.location.city + ' ';
      }
      if (vm.venue.location.country) {
        message = message + vm.venue.location.country + ' ';
      }
      var verified = vm.venue.verified ? 'is verified!' : "is not verified!"
      message = message + verified;
      var url = "http://twitter.com/home?status=" + encodeURIComponent(message);
      window.open(url, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=" + y + ",left=" + x + ",width=300,height=300");
    }

  }

}());

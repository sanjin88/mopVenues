(function () {
  'use strict';

  angular
    .module('venues.services')
    .factory('VenuesService', VenuesService);

  VenuesService.$inject = ['$http', '$log'];

  function VenuesService($http, $log) {
    var service = this;

    service.createOrUpdate = createOrUpdate;



    function createOrUpdate(venue) {
      var url = '/api/venues';
      return $http.post(url, venue);
    }


    return service;

    function handleError(error) {
      $log.error(error);
    }
  }
}());

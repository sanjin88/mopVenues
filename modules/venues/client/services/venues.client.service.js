(function () {
  'use strict';

  angular
    .module('venues.services')
    .factory('VenuesService', VenuesService);

  VenuesService.$inject = ['$http', '$log'];

  function VenuesService($http, $log) {
    var service = this;

    service.createOrUpdate = createOrUpdate;
    service.getCurrentUserVenues = getCurrentUserVenues;
    service.getAllVenues = getAllVenues;

    function createOrUpdate(venue) {
      var url = '/api/venues';
      return $http.post(url, venue);
    }

    function getCurrentUserVenues() {
      var url = '/api/userVenues';
      return $http.get(url).then(function (resp) {
        return resp.data;
      });
    }

    function getAllVenues() {
      var url = '/api/venues';
      return $http.get(url).then(function (resp) {
        return resp.data;
      });
    }


    return service;

    function handleError(error) {
      $log.error(error);
    }
  }
}());

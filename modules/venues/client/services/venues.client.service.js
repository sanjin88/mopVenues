(function () {
  'use strict';

  angular
    .module('venues.services')
    .factory('VenuesService', VenuesService);

  VenuesService.$inject = ['$resource', '$log', 'FourSquareService'];

  function VenuesService($resource, $log, FourSquareService) {
    var Venue = $resource('/api/venues/:venueId', {
      venueId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    angular.extend(Venue.prototype, {
      createOrUpdate: function () {
        var venue = this;
        return createOrUpdate(venue);
      }
    });

    return Venue;

    function createOrUpdate(venue) {
      if (venue._id) {
        return venue.$update(onSuccess, onError);
      } else {
        return venue.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(venue) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());

(function () {
    'use strict';

    angular
        .module('venues.services')
        .service('VenuesListService', VenuesListService);

    VenuesListService.$inject = ['FourSquareService', "$q", 'VenueModel'];

    function VenuesListService(FourSquareService, $q, VenueModel) {
        var service = this;

        service.getVenues = getVenues;

        function handleError(error) {
            // Log error
            $log.error(error);
        }

        function getVenues() {
            var defer = $q.defer();
            FourSquareService.getVenuesFromFourSquare().then(function (venues) {
                service.venues = [];

                angular.forEach(venues, function (venue) {
                    service.venues.push(new VenueModel(venue))
                })
                console.log(service.venues)
                defer.resolve(service.venues)
            });
            return defer.promise;
        }



    }

}());

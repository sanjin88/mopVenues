(function () {
    'use strict';

    angular
        .module('venues.services')
        .service('VenuesListService', VenuesListService);

    VenuesListService.$inject = ['FourSquareService', "$q", 'VenueModel', 'VenuesService'];

    function VenuesListService(FourSquareService, $q, VenueModel, VenuesService) {
        var service = this;

        service.getVenues = getVenues; //Search API
        service.getAllVenues = getAllVenues; //From DB;

        function handleError(error) {
            // Log error
            $log.error(error);
        }

        function getVenues(searchParams) {
            var promises = [];
            var defer = $q.defer();

            promises.push(VenuesService.getCurrentUserVenues());
            promises.push(FourSquareService.getVenuesFromFourSquare(searchParams));

            $q.all(promises).then(function (resp) {
                defer.resolve(proccessFoundVenues(resp))
            })
            return defer.promise;
        }

        //Match found venues to get tagged info
        function proccessFoundVenues(venues) {
            var proccessedVenues = [];
            angular.forEach(venues[1], function (venue) {
                var index = containsVenue(venue.id, venues[0]);
                if (index > -1) {
                    venue.tagged = true;
                    venue.users = venues[0][index].users // get users from db venue
                }
                proccessedVenues.push(new VenueModel(venue))
            })
            return proccessedVenues;
        }

        function containsVenue(venueId, arrayOfVenues) {
            for (var i = 0; i < arrayOfVenues.length; i++) {
                if (arrayOfVenues[i].id === venueId) {
                    return i;
                }
            }
            return -1;
        }

        function getAllVenues() {
            var defer = $q.defer();
            var venues = [];
            VenuesService.getAllVenues().then(function (resp) {
                angular.forEach(resp, function (venue) {
                    venue.public = true;
                    venues.push(new VenueModel(venue));
                })
                defer.resolve(venues)
            })
            return defer.promise;
        }

    }

}());

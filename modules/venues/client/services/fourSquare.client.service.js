(function () {
    'use strict';

    angular
        .module('venues.services')
        .factory('FourSquareService', FourSquareService);

    FourSquareService.$inject = ['$http', 'FOURSQUARE_SEARCH_VENUES_API', 'FOURSQUARE_ID', 'FOURSQUARE_SECRET', 'FOURSQUARE_VERSIONING', '$q', '$state', '$log', 'LocationService'];

    function FourSquareService($http, FOURSQUARE_SEARCH_VENUES_API, FOURSQUARE_ID, FOURSQUARE_SECRET, FOURSQUARE_VERSIONING, $q, $state, $log, LocationService) {

        var service = this;

        service.getVenuesFromFourSquare = getVenuesFromFourSquare;

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
        function handleError(error) {
            // Log error
            $log.error(error);
        }

        function getVenuesFromFourSquare() {
            var defer = $q.defer();
            getLocation().then(function (response) {
                defer.resolve(getVenues(response));
            }, function (err) {
                onError(err);
                var r = confirm("Unable to get current location, do you want venues near Sarajevo instead?");
                if (r == true) {
                    defer.resolve(getVenues(err));
                } else {
                    $state.go('home')
                    defer.reject();
                }
            })
            return defer.promise;
        }

        function getLocation() {
            return LocationService.getLocation();
        }

        function getVenues(crd) {
            var defer = $q.defer();
            var params = {
                ll: crd.latitude + ',' + crd.longitude,
                client_id: FOURSQUARE_ID,
                client_secret: FOURSQUARE_SECRET,
                v: FOURSQUARE_VERSIONING,
                sortByDistance: 1,
                limit: 50
            }

            $http({
                method: 'GET',
                url: FOURSQUARE_SEARCH_VENUES_API,
                headers: { Authorization: undefined }, //'Couse browser is sending Cors/OPTIONS
                params: params
            }).then(function (response) {
                onSuccess('Success getting venues from FurSquare')
                var data = response.data.response.venues
                defer.resolve(data);
            }, function (err) {
                onError(err);
                defer.reject();
            });

            return defer.promise;
        }

        return service
    }
}());

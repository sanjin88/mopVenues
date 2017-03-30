(function () {
    'use strict';

    angular
        .module('venues.services')
        .factory('FourSquareService', FourSquareService);

    FourSquareService.$inject = ['$http', 'FOURSQUARE_SEARCH_VENUES_API', 'FOURSQUARE_AUTHENTICATE_API', 'FOURSQUARE_ID', 'FOURSQUARE_SECRET', 'FOURSQUARE_VERSIONING', 'FOURSQUARE_REDIRECT_URL', '$q', '$state', '$log', 'LocationService', 'SweetAlert'];

    function FourSquareService($http, FOURSQUARE_SEARCH_VENUES_API, FOURSQUARE_AUTHENTICATE_API, FOURSQUARE_ID, FOURSQUARE_SECRET, FOURSQUARE_VERSIONING, FOURSQUARE_REDIRECT_URL, $q, $state, $log, LocationService, SweetAlert) {

        var service = this;

        service.logIn = logIn;

        service.getVenuesFromFourSquare = getVenuesFromFourSquare;

        // Handle successful response
        function onSuccess(message) {
            $log.info(message)
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

        function getVenuesFromFourSquare(searchParams) {
            var defer = $q.defer();
            getLocation().then(function (response) {
                defer.resolve(getVenues(response, searchParams));
            }, function (err) {
                onError(err);
                defer.resolve(getVenues(err));
            })
            return defer.promise;
        }

        function getLocation() {
            return LocationService.getLocation();
        }

        function getVenues(crd, searchParams) {
            var defer = $q.defer();
            var params = {
                ll: crd.latitude + ',' + crd.longitude,
                client_id: FOURSQUARE_ID,
                client_secret: FOURSQUARE_SECRET,
                v: FOURSQUARE_VERSIONING,
                sortByDistance: 1,
                limit: 50,
                query: searchParams.searchString || '',
                radius: searchParams.radius || 5000,
                intent: 'browse'
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

        function logIn() {
            SweetAlert.swal({
                title: "It is needed to login to FourSuare.com",
                text: "Some app features require FourSquare authentication",
                type: "info",
                showCancelButton: true,
                confirmButtonColor: "#5bc0de",
                confirmButtonText: "Go to FourSquare.com!",
                closeOnConfirm: true,
                closeOnCancel: true
            }, function (isConfirm) {
                if (isConfirm) {
                    var url = FOURSQUARE_AUTHENTICATE_API
                        + "?client_id=" + FOURSQUARE_ID
                        + "&response_type=token&redirect_uri="
                        + FOURSQUARE_REDIRECT_URL;
                    window.location.replace(url)
                }
            });
        }

        return service
    }
}());

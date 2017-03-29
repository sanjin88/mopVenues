(function () {
    'use strict';

    angular
        .module('venues.services')
        .service('LocationService', LocationService);

    LocationService.$inject = ['$q', '$log'];

    function LocationService($q, $log) {

        var service = this;
        service.getLocation = getLocation;

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


        function getLocation() {
            
            var defer = $q.defer();

if(service.location){
    defer.resolve(service.location);
     return defer.promise;
}
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function success(pos) {
                onSuccess(pos)
                var crd = pos.coords;
                service.location = crd;
                defer.resolve(crd)
            };

            function error(err) {
                onError(err.message);
                var crd = {  // Sarajevo ltd lng
                    latitude: '43.84864',
                    longitude: '18.35644'
                }
                defer.reject(crd)
            };

            navigator.geolocation.getCurrentPosition(success, error, options);

            return defer.promise;
        }

        return service;
    }
}());

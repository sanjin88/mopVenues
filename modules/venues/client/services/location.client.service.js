(function () {
    'use strict';

    angular
        .module('venues.services')
        .service('LocationService', LocationService);

    LocationService.$inject = ['$q', '$log', '$state', '$http'];

    function LocationService($q, $log, $state, $http) {

        var service = this;
        service.defer = null;

        service.getLocation = getLocation;

        // Sarajevo ltd lng
        var sarajevoCrd = {
            latitude: '43.84864',
            longitude: '18.35644'
        }

        // Handle successful response
        function onSuccess(from) {
            $log.info("Success getting location from ", from)
        }

        // Handle error response
        function onError(errorResponse) {
            var error = errorResponse;
            // Handle error internally
            handleError(error);
        }
        function handleError(error) {
            // Log error
            $log.error(error);
        }

        function getDefer() {
            if (service.defer === null) {
                service.defer = $q.defer();
            }

        }

        function getLocation() {
            getDefer();
            // if it is already resolved return promise
            if (service.defer.promise.$$state.status === 1) {
                return service.defer.promise;
            } else {
                return getLocationFromNavigator();
            }
        }

        function getLocationFromNavigator() {

            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            function navigatorSuccess(pos) {
                onSuccess("HTML5 navigator")
                var crd = pos.coords;
                service.defer.resolve(crd)
            };

            function navigatorError(err) {
                onError(err.message);

                if (confirm("Unable to get current location from HTML5 navigator, do you want to try get location from ipinfo.io (less acurate) ?")) {
                    getLocationFromIpInfo();
                } else {
                    $state.go('home')
                    service.defer.reject();
                }
            };

            navigator.geolocation.getCurrentPosition(navigatorSuccess, navigatorError, options);

            return service.defer.promise;
        }

        function getLocationFromIpInfo() {

            function ipinfoSuccess(resp) {
                onSuccess("ipinf.io")
                var crdArr = resp.loc.split(",");
                var crd = {
                    latitude: crdArr[0],
                    longitude: crdArr[1]
                }
                service.defer.resolve(crd)
            };

            function ipinfoError(err) {
                onError(err);
                if (confirm("Unable to get current location from ifinfo.io, do you want venues near Sarajevo instead?")) {
                    service.defer.resolve(sarajevoCrd)
                } else {
                    $state.go('home')
                    service.defer.reject();
                }
            };
            $http.get("http://ipinfo.io").then(function (resp) {
                ipinfoSuccess(resp.data);
            }, function (err) {
                ipinfoError(err);
            })

            return service.defer.promise;
        }



        return service;
    }
}());

(function () {
    'use strict';

    angular
        .module('core')
        .factory('SearchUsersService', SearchUsersService);

    SearchUsersService.$inject = ['$http', 'FOURSQUARE_SEARCH_USERS_API', 'FOURSQUARE_ID', 'FOURSQUARE_SECRET', 'FOURSQUARE_VERSIONING', 'FOURSQUARE_ACCESS_TOKEN','$q', '$state', '$log'];

    function SearchUsersService($http, FOURSQUARE_SEARCH_USERS_API, FOURSQUARE_ID, FOURSQUARE_SECRET, FOURSQUARE_VERSIONING, FOURSQUARE_ACCESS_TOKEN, $q, $state, $log) {

        var service = this;

        service.getUsers = getUsers;

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

        function getUsers(searchParams) {
            var token = FOURSQUARE_ACCESS_TOKEN;
            var defer = $q.defer();
            var params = {
                oauth_token: token,
                v: FOURSQUARE_VERSIONING,
                twitter: searchParams.twitter || '',
                twitterSource: searchParams.twitterSource || '',
                name: searchParams.name || ''
            }

            $http({
                method: 'GET',
                url: FOURSQUARE_SEARCH_USERS_API,
                headers: { Authorization: undefined }, //'Couse browser is sending Cors/OPTIONS
                params: params
            }).then(function (response) {
                onSuccess('Success getting users from FurSquare')
                var data = response.data.response.results;
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

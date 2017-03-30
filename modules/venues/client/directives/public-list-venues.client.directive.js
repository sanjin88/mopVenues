(function () {
    'use strict';


    angular
        .module('venues')
        .directive('publicVenuesList', publicVenuesList);

    function publicVenuesList() {
        return {
            restrict: 'E',
            scope: {
                venue: '=',
            },
            templateUrl: 'modules/venues/client/views/public-list-venues.client.view.html',
            controller: 'PublicVenuesListController',
            controllerAs: 'publicVenuesListCtrl',
            bindToController: true
        }
    }

}());

(function () {
    'use strict';


    angular
        .module('venues')
        .directive('venue', venue);

    function venue() {
        return {
            restrict: 'E',
            scope: {
                venue: '=',
            },
            templateUrl: 'modules/venues/client/views/venue.client.view.html',
            controller: 'VenueClientDirectiveController',
            controllerAs: 'venueClientDirectiveCtrl',
            bindToController: true
        }
    }
    
}());

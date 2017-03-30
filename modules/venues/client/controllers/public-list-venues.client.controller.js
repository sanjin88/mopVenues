(function () {
    'use strict';

    angular
        .module('venues')
        .controller('PublicVenuesListController', PublicVenuesListController);

    PublicVenuesListController.$inject = ['VenuesService', 'VenuesListService', "LocationService"];

    function PublicVenuesListController(VenuesService, VenuesListService, LocationService) {
        var vm = this;

        vm.orderBy = orderBy;

        vm.order = {
            rule: '-users.length',
            current: 'popularity',
            popularity: true,
            distance: true,
            title: 'most tagged'
        }

        function orderBy(rule) {
            if (rule === 'popularity') {
                vm.order.type == 'popularity';
                if (vm.order.popularity) {
                    vm.order.rule = 'users.length';
                    vm.order.title = 'least tagged';
                    vm.order.popularity = false;
                } else {
                    vm.order.rule = '-users.length';
                    vm.order.title = 'most tagged';
                    vm.order.popularity = true;
                }
            } else {
                vm.order.type == 'distance';
                if (vm.order.distance) {
                    vm.order.rule = 'location.distance';
                    vm.order.title = 'nearest';
                    vm.order.distance = false;
                } else {
                    vm.order.rule = '-location.distance';
                    vm.order.title = 'farthest';
                    vm.order.distance = true;
                }
            }
        }

        getVenues();

        function getVenues() {
            VenuesListService.getAllVenues().then(function (venues) {
                vm.venues = venues;
                loadMap();
            });
        }

        function loadMap() {
            LocationService.getLocation().then(function (response) {
                vm.map = {
                    center: [response.latitude, response.longitude]
                }
                vm.map.show = true;
            });
        }

    }
}());

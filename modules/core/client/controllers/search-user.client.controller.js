(function () {
    'use strict';

    angular
        .module('core')
        .controller('SearchUsersController', SearchUsersController);

    SearchUsersController.$inject = ['SearchUsersService'];

    function SearchUsersController(SearchUsersService) {
        var vm = this;

        vm.searchParams = {
            twitter: '',
            twitterSource: '',
            name: ''
        }

        vm.getUsers = getUsers;

        function getUsers(searchBy) {

            if (searchBy === 'handle') {
                if (!vm.searchParams.twitter) {
                    vm.users.length = 0;
                    return;
                }
                var queryObj = {
                    twitter: vm.searchParams.twitter
                }
            } else if (searchBy === 'source') {
                if (!vm.searchParams.twitterSource) {
                    vm.users.length = 0;
                    return;
                }
                var queryObj = {
                    twitterSource: vm.searchParams.twitterSource
                }
            } else if (searchBy === 'name') {
                if (!vm.searchParams.name) {
                    vm.users.length = 0;
                    return;
                }
                var queryObj = {
                    name: vm.searchParams.name
                }
            }
            vm.searchParams = queryObj;

            SearchUsersService.getUsers(vm.searchParams).then(function (users) {
                vm.users = users;
            });
        }

    }
}());
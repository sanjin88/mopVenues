(function () {
    'use strict';

    angular
        .module('venues.services')
        .factory('VenueModel', VenueModel);

    VenueModel.$inject = ['VenuesService', 'Notification'];

    function VenueModel(VenuesService, Notification) {


        function Venue(initialData) {
            this.id = initialData.id || '';
            this.name = initialData.name || '';
            this.location = initialData.location || {};
            this.users = initialData.users || [];
            this.verified = initialData.verified || false;
            this.tagged = initialData.tagged || false;
            this.public = initialData.public || false;
        }


        Venue.prototype.tag = function () {
            var venue = this;
            VenuesService.createOrUpdate(venue).then(function (resp) {
                Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Tag update successful!' });
                venue.tagged = resp.data.tagged;
            }, function (resp) {
                Notification.error({ message: '<i class="glyphicon glyphicon-remove"></i> Tagging Error!', delay: 6000 });
            })
        }

        return Venue;
    }
}());

'use strict';

/**
 * Module dependencies
 */
var venuesPolicy = require('../policies/venues.server.policy'),
  venues = require('../controllers/venues.server.controller');

module.exports = function (app) {
  // Venues collection routes
  app.route('/api/venues').all(venuesPolicy.isAllowed)
    .get(venues.list)
    .post(venues.createOrUpdate);

  // Single venue routes
  app.route('/api/venues/:venueId').all(venuesPolicy.isAllowed)
    .get(venues.read)
    .put(venues.update)
    .delete(venues.delete);

  // Finish by binding the venue middleware
  app.param('venueId', venues.venueByID);
};

(function (app) {
  'use strict';

  app.registerModule('venues', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('venues.services');
  app.registerModule('venues.routes', ['ui.router', 'core.routes', 'venues.services']);
}(ApplicationConfiguration));

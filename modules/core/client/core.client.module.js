(function (app) {
  'use strict';

  app.registerModule('core', ['venues', 'venues.services']);
  app.registerModule('core.routes', ['ui.router']);
}(ApplicationConfiguration));

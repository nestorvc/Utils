define(['jquery', 'nitram'], function($, nitram) {
  'use strict';

  // ----------------------
  // Routes
  // ----------------------

  nitram.routes = {
    '/': {
      controller: 'ejemploController',
      title: 'Ejemplo',
      req: true
    }
  };

  // ----------------------
  // Controllers
  // ----------------------

  nitram.ejemploController = function(route, data) {
    // compile to intercept new links
    this.compile($('#mainView').html(data));
  }

  // ----------------------
  // Utils
  // ----------------------

  /**
   * Renders the app
   * - res <Object> express response
   * returns: <undefined>
   */


  // ----------------------
  // Init
  // ----------------------

  var app = {
    nitram: nitram,
    init: function() {
      nitram.init();
      nitram.compile($('#masthead'));
    }
  };

  return app;

});
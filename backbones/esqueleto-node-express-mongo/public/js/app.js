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
/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// PO model
	app.PO = Backbone.Model.extend({
		
		defaults: {
			name: ''
		},

		toggle: function () {
			app.selectedPO = this;
		},
		reset: function() {

		},

		
		change: function() {

		}
	});
	app.selectedPO = new app.PO();
})();

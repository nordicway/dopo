/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	var POs = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.PO,
		url: 'data/pos.json',
		
		comparator: function (po) {
			return po.get('name');
		}
	});

	app.POs = new POs();
})();

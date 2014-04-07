/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// PO model
	app.PO = Backbone.Model.extend({
		
		defaults: {
			name: ''
		},
		
		localStorage: new Backbone.LocalStorage('dopo-selectedPO'),

		toggle: function () {
			app.selectedPO = this;
		},
		
		isEmpty: function() {
			if (this.get('name')) {
				return false;
			} else {
				return true;
			}
		},
		
		fetchOrDefault: function(def) {
			this.fetch({reset: true});
			if (this.isEmpty()) {
				this.set('name', def);
			}
		}
	});
	app.selectedPO = new app.PO({ id: 1 });
})();

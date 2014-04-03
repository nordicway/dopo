/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.Modules = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Module,
		
		localStorage: new Backbone.LocalStorage('modules'),
	
		addExam: function(exam) {
			this.add(exam);
		}
	});

	app.modules = new app.Modules();
})();

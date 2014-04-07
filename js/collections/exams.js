/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	app.Exams = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Exam,

		comparator: function (exam) {
			return exam.get('grade');
		},
		
		localStorage: new Backbone.LocalStorage('exams'),
		
	
		save: function() {
			_.each(this.models, function(model) {
				model.save();
			});
		},
	
		addExam: function(exam) {
			this.add(exam);
		},
		
		markUnused: function() {
			//disable event listeners with silent option to speed up process
			//TODO verify that it actually works since this is pretty slow
			this.invoke('set', { "used": false }, { "silent": true } );			
		}
	});

	app.exams = new app.Exams({id : 1});
	
})();

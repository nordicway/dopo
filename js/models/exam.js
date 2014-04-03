/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	//Exam Model
	app.Exam = Backbone.Model.extend({
		defaults: {
			number: '',
			name: '',
			type: 0,
			date: '',
			examiner: '',
			grade: '5,0',
			ects: new Number(5),
			passed: false,
			status: '',
			remark: '',
			used: false //internal use
		},
		
		validate: function(attrs, options) {
			//TODO use an enum to validate grades instead
			var gradeRegex = /[0-9],[0-9]/g;
			if (gradeRegex.test(attrs.grade) === false ) {
				return "is not a valid grade";
			}
		},
		
		getWeightedPoints: function() {
			return this.getGradeNumber() * this.get('ects');
		},
		
		getGradeNumber: function() {
			return new Number(this.get('grade').replace(",",".") );
		},

		reset: function() {

		},

		
		change: function() {

		}
	});
})();

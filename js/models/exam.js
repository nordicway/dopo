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
		
		/*
		 * Returns the grade of this exam as a Number.
		 */
		getGradeNumber: function() {
			return new Number(this.get('grade').replace(",",".") );
		},
		
		/*
		 * Returns true if user passed this exam.
		 * Returns false otherwise.
		 */
		isPassed: function() {
			var passed = false;
			var grade = this.getGradeNumber();
			if (!isNaN(grade) && grade < 5) {
				passed = true;
			}
			return passed;
		},

		reset: function() {

		}
	});
})();

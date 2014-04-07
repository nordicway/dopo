/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Module model
	app.Module = Backbone.Model.extend({
		defaults: function() {
			//return as a new object so we create a new exam collection for
			//each module instead of referencing a single collection for all
			//modules
			return {
				number: '',
				name: '',
				cp: 0,
				type: 0,
				availableExams: [], //exam numbers only
				exams: new app.Exams(), //collection of exam models
				achievedCP: 0,
				examSpots: 1,
				grade: "5,0"
			}
		},
		
		initialize: function(options){
			//if exams come within an array, convert them to objects
			if (options.exams instanceof Array) {
				this.set({exams: new app.Exams()});
				this.get('exams').reset(options.exams);
			}
		},
		
		/*
		 * Returns true if user passed this module.
		 * Returns false otherwise.
		 */
		isPassed: function() {
			if (this.get('cp') && this.get('achievedCP') === this.get('cp')) {
				return true;
			}
			return false;
		},
		
		/*
		 * Returns grade of this module as a Number.
		 */
		getGradeNumber: function() {
			return new Number(this.get('grade')+"".replace(",",".") );
		},
		
		getCPNumber: function() {
			return new Number(this.get('cp'));
		},
		
		getWeightedGrade: function() {
			return this.getGradeNumber() * this.get('cp');
		},
		
		setGrade: function() {
			var currentECTS = 0;
			this.get('exams').each( function(exam) {
				currentECTS += exam.getWeightedPoints();
			});
			var moduleGrade = (currentECTS / this.get('cp')).cutOff(1);
			this.set('grade', moduleGrade);
		},
		
		addExam: function(exam) {
			this.get('exams').add(exam); //push
			exam.set('used', true);
			this.setAchievedCP();
			this.setGrade();
		},
		
		setAchievedCP: function() {
			var cp = 0;
			this.get('exams').each(function(exam) {
				cp += new Number(exam.get('ects'));
			});
			this.set('achievedCP', cp);
		}
	});
})();

/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Module model
	app.Module = Backbone.Model.extend({
		defaults: {
			number: '',
			name: '',
			cp: 0,
			type: 0,
			availableExams: [],
			achievedCP: 0,
			examSpots: 1,
			grade: "5,0"
		},
		
		initialize: function(options){
            if( !this.get('exams') ){ 
            	this.set({exams: new app.Exams()});
            }
            
		},
		
		isPassed: function() {
			if (this.get('cp') && this.get('achievedCP') === this.get('cp')) {
				return true;
			}
			return false;
		},
		
		getGradeNumber: function() {
			return new Number(this.get('grade').replace(",",".") );
		},
		
		getWeightedGrade: function() {
			return this.getGradeNumber() * this.get('cp');
		},
		
		setGrade: function() {
			if (this.get('name')=='Wahlpflichtthemenbereich') {
				var x = true;
			}
			
			var currentECTS = 0;
			this.get('exams').each( function(exam) {
				currentECTS += exam.getWeightedPoints();
			});
			var moduleGrade = (currentECTS / this.get('cp')).toFixed(1);
			this.set('grade', moduleGrade);
		},
		
		addExam: function(exam) {
			this.get('exams').add(exam); //push
			exam.set('used', true);
			this.setAchievedCP();
			//this.set('achievedCP', this.get('achievedCP') + exam.get('ects') );
			this.setGrade();
		},
		
		setAchievedCP: function() {
			var cp = 0;
			this.get('exams').each(function(exam) {
				cp += new Number(exam.get('ects'));
			});
			this.set('achievedCP', cp);
		},

		reset: function() {

		},

		change: function() {

		}
	});
})();

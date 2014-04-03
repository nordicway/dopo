/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	//Model for ODS text
	app.ODSText = Backbone.Model.extend({
		defaults: {
			text: ''
		},

		toggle: function () {
			this.save({
			});
		},
		
		/*
		 * loads ODS sample text from JSON file
		 */
		loadTestData: function() {
			var scope = this;
			$.ajax({
				  url: "data/sampleExams.txt"
				})
				  .done(function( data ) {
				    scope.set('text', data);
				    scope.trigger('changed');
			});
		},
		
		getGrades: function() {
			app.exams.reset();
			var lines = this.get('text').split("\n");
			
			//get text from ODS table and add exams to collection
			for(var i=0; i < lines.length; i++) {
				
				var fields = lines[i].split("\t");
				
				var tmpExam = new app.Exam();
				tmpExam.set('number', this.convertVal(fields[0]) );
				tmpExam.set('name', this.convertVal(fields[1]) );
				//TODO only include actual exams, not completed modules
				//tmpExam.set('type', this.convertVal(fields[2]) );
				tmpExam.set('date', this.convertVal(fields[3]) );
				tmpExam.set('examiner', this.convertVal(fields[4]) );
				tmpExam.set('grade', this.convertVal(fields[5]) );
				tmpExam.set('ects', new Number(this.convertVal(fields[6]) ) );
				tmpExam.set('status', this.convertVal(fields[7]) );
				tmpExam.set('remark', this.convertVal(fields[8]) );
				
				//set pass status manually
				if (tmpExam.get('status').startsWith('BE,') ) {
					tmpExam.set('passed', true);
				}
				
				if (tmpExam.isValid()) {
					app.exams.addExam(tmpExam);
				}
				
			}
		},
		
		convertVal: function(val) {
			return (val === undefined ? "" : val.trim()); 
		},
		
		change: function() {
		},
		
		save: function() {
			
		}
	});
})();

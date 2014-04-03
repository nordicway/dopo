/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	//Grade sheet model
	app.Gradesheet = Backbone.Model.extend({
		defaults: {
			name: '',
			cpTotal: 0,
			achievedCP: 0,
			modules: new app.Modules(),
			meanExamGrade: 0.0,
			meanModuleGrade: 0.0,
			weightedModuleGrade: 0.0
		},
		
		initialize: function(options){
			if (options !== undefined && options.modules != undefined) {
				this.set('modules', new app.Modules(options.modules));
			}
		},

		reset: function() {
		},
		
		calculate: function() {
			this.setAchievedCP();
			this.setMeanExamGrade();
			this.setMeanModuleGrade();
			this.setWeightedModuleGrade();
		},

		
		change: function() {
		},
		
		setMeanExamGrade: function() {
			var gradeSum = 0;
			var numExams = 0;
			this.get('modules').each(function(module) {
				module.get('exams').each(function(exam) {
					gradeSum += exam.getGradeNumber();
					numExams++;
				});
			});
			this.set('meanExamGrade', new Number(gradeSum / numExams).toFixed(2) );
		},
		
		setMeanModuleGrade: function() {
			var gradeSum = 0;
			var numModules = 0;
			this.get('modules').each(function(module) {
				if (module.isPassed()) {
					gradeSum += module.getGradeNumber();
					numModules++;
				}
			});
			this.set('meanModuleGrade', new Number(gradeSum / numModules).toFixed(2) );
		},
		
		setWeightedModuleGrade: function() {
			var cpSum = 0;
			this.get('modules').each(function(module) {
				if (module.isPassed()) {
					cpSum += module.getWeightedGrade();
				}
			});
			this.set('weightedModuleGrade', new Number(cpSum / this.get('cpTotal')).toFixed(1) );
		},
		
		setAchievedCP: function() {
			var cp = 0;
			this.get('modules').each(function(module) {
				module.setAchievedCP();
				cp += new Number(module.get('achievedCP') );
			});
			this.set('achievedCP', cp);
		},
		
		/*
		 * Takes finished exams and places them on the grade sheet within the fitting modules
		 */
		setExams: function(exams) {
			
			//filter top level modules which can inherit multiple regular modules
			var topLevel = this.get('modules').where({type: 1});
			for(var i=0;i<topLevel.length;i++) {
				
				var currentModule = topLevel[i];
				//fill the module with exams until the needed credit points are reached
				while (currentModule.get('achievedCP') < currentModule.get('cp')) {
					var bestExam = this.findBestExamInModule(currentModule);
					
					if (bestExam != null) {
						currentModule.addExam(bestExam);
					} else {
						//no exam found for this module
						break;
					}
				}
				
				//fill with empty exams when not enough exams were written thus far
				var examSpots = new Number(currentModule.get('examSpots') );
				
				while (currentModule.get('exams').length < examSpots ) {
					var examCP = new Number(5);
					if (examSpots == 1) {
						examCP = new Number(currentModule.get('cp') );
					}
					//TODO differentiate between written and unwritten exams for easier grade calculation
					var fillerExam = new app.Exam({ name: 'n.n', ects: new Number(0), grade: "5,0", passed: true });
					app.exams.add(fillerExam);
					currentModule.addExam(fillerExam);
				}
			}
			
		},
		
		/*
		 * returns an exam within the specified module with the best grade.
		 * returns null if no exam could be found.
		 */
		findBestExamInModule: function(module) {
			var availableExams = module.get('availableExams');
			
			var bestExam = null;
			for (var i=0; i<availableExams.length;i++) {
				
				/*
				 * look for exams that are 
				 * 1) not modules
				 * 2) fit within the top module (by exam number)
				 * 3) do not show up on the grade sheet yet 
				 */
				var idMatch = app.exams.filter(function(exam) {
				    return (
				      exam.get('type')  == 0 &&
				      exam.get('number') == availableExams[i] &&
				      exam.get('used') == false
				    )
				  });
				
				//exam IDs are unique so we get the first
				var currentExam = idMatch[0] || null;
				if (currentExam && (bestExam === null || currentExam.get('grade') <= bestExam.get('grade') ) ) {
					bestExam = currentExam;
				}
			}
			return bestExam;
		}
	});
})();

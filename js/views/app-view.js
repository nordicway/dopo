/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};
var gs;
(function ($) {
	'use strict';

	// The Application
	// ---------------
	app.gradeSheet = new app.Gradesheet();
	
	// Our overall **AppView** is the top-level piece of UI.
	app.AppView = Backbone.View.extend({

		el: '#gradesapp',

		statsTemplate: _.template($('#stats-template').html()),

		events: {
			'click #calculate': 'updateExams',
			'click #loadTestData': 'loadTestData',
			'click #load-gradesheet': 'load',
			'click #save-gradesheet': 'save',
			'click #export-gradesheet': 'export',
			'click #import-gradesheet': 'forwardImportClick',
			'change #import-gradesheet-file-input': 'import',
			'click #clear-storage': 'clearStorage'
		},

		initialize: function () {
			this.odsIncomingView = new app.ODSIncomingView( { model: new app.ODSText() } );
			new app.POView();
			
			this.$footer = this.$('#footer');
			this.$main = this.$('#main');
			this.$modulelist = $('#module-list');

			//TODO 
			this.listenTo(app.exams, 'change', this.updateGrades);
			
			this.listenTo(app.POs, 'all', this.render);
			this.listenTo(app.gradeSheet, 'all', this.updateGrades);
			
			//load PO names
			app.POs.fetch({ reset: true });
			
			app.exams.fetch({ reset: true });
			app.gradeSheet.fetch({ reset: true});
			app.gradeSheet.calculate();
			this.addAll();
			this.render();
		},
		
		clearStorage: function() {
			window.localStorage.clear();
			//TODO re-initialize collections instead
			window.location.reload();
		},
		
		load: function() {
			//load saved gradesheet
			app.gradeSheet.fetch({reset: true});
			app.gradeSheet.calculate();
			this.addAll();
			this.render();
		},
		
		export: function() {
			this.save();
			console.save(localStorage, 'dopo_export.txt');
		},
		
		forwardImportClick: function() {
			$("#import-gradesheet-file-input").click();
		},
		
		import: function(e) {
			var file = e.target.files[0];
			var fileType = /text.*/;

			if (file.type.match(fileType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					//clear old localStorage and rewrite it from uploaded file
					localStorage.clear();
					var fileStorage = JSON.parse(reader.result);
					gs = fileStorage;
					for (var key in fileStorage){
						localStorage.setItem(key, fileStorage[key]);
					}
					window.location.reload();
				}
				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerHTML = "Dateityp nicht unterstützt!"
			}
		},
		
		save: function() {
			app.gradeSheet.save();
			app.exams.save();
			app.selectedPO.save();
			this.initialize();
		},
		
		loadTestData: function() {
			this.odsIncomingView.loadTestData();
		},
		
		updateGrades: function() {
			app.gradeSheet.calculate();
			this.render();
		},

		render: function () {
			this.$footer.html(this.statsTemplate(app.gradeSheet.toJSON()) );
		},
		
		updateExams: function() {
			//TODO move this away from view
			var scope = this;
			$.getJSON("data/"+app.selectedPO.get("name")+".json").done(function( data ) {
			}).always( function(data, textStatus) {
				app.gradeSheet = new app.Gradesheet(data);
				//delete filler exams since they are regenerated dynamically
				app.exams.deleteFillers();
				app.exams.markUnused();
				app.gradeSheet.setExams(app.exams);
				app.gradeSheet.calculate();
				scope.addAll();
				scope.render();
			}).fail( function() {
				alert("Failed to load JSON file for this PO");
			});
			
		},

		addOne: function (module) {
			//modules get their color from PO JSON, so initiate view with that
			module.set('color', app.gradeSheet.get('color'));
			var view = new app.ModuleView({ model: module });
			this.$modulelist.append(view.render().el);
		},
		
		addPOs: function(POs) {
			var view = new app.POView();
			
		},

		clearAll: function() {
			app.gradeSheet.destroy();
			app.exams.reset();
			this.clearModuleList();
			
		},
		
		clearModuleList: function() {
			this.$modulelist.html('');
		},
		
		addAll: function () {
			this.clearModuleList();
			
			app.gradeSheet.get('modules').each(this.addOne, this);
		}
	});
})(jQuery);

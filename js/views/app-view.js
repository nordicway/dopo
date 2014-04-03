/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

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

			//load PO names
			app.POs.fetch({ reset: true });
			
			
		},
		
		loadTestData: function() {
			console.log("app-view: load test data");
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

		addAll: function () {
			this.$modulelist.html('');
			
			app.gradeSheet.get('modules').each(this.addOne, this);
		}
	});
})(jQuery);

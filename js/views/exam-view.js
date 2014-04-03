/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.ExamView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#exam-template').html()),

		events: {
			'click .edit-button': 'edit',
			'click .save-button': 'close'
		},

		initialize: function () {
			this.exams = this.model.get('exams');
			
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			this.$inputname = this.$('.edit input[name="name"]');
			this.$inputgrade = this.$('.edit input[name="grade"]');
			this.$inputects = this.$('.edit input[name="ects"]');
			this.$output = this.$('.view');
			this.$el.toggleClass('view', this.model.get('completed'));
			this.$input.toggleClass('hidden');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
			
		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return false;
		},

		// Toggle the `"completed"` state of the model.
		toggleCompleted: function () {
			this.model.toggle();
		},

		edit: function () {
			this.switchMode();
		},
		
		switchMode: function() {
			this.$input.toggleClass('hidden');
			this.$output.toggleClass('hidden');
		},

		close: function () {
			var examName = this.$inputname.val().trim();
			var examGrade = this.$inputgrade.val().trim();
			var examECTS = this.$inputects.val().trim();

			if (examName && examGrade && examECTS) {
				this.model.save({ 	name: examName,
									grade: examGrade,
									ects: examECTS
								});	
				this.model.trigger('change');
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});
})(jQuery);
/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.ExamView = Backbone.View.extend({
		tagName:  'div',

		template: _.template($('#exam-template').html()),

		events: {
			'click .edit-button': 'edit',
			'dblclick label': 'edit',
			'click .save-button': 'close',
			'keypress .edit': 'updateOnEnter'
		},

		initialize: function () {
			this.exams = this.model.get('exams');
			
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$input = this.$('.edit');
			this.$inputname = this.$('.edit input[name="name"]');
			this.$inputgrade = this.$('.edit input[name="grade"]');
			this.$inputects = this.$('.edit input[name="ects"]');
			this.$output = this.$('.view');
			this.$input.toggleClass('hidden');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
			
		},

		edit: function () {
			this.switchMode();
		},
		
		switchMode: function() {
			this.$input.toggleClass('hidden');
			this.$output.toggleClass('hidden');
		},
		
		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
			this.close();
			}
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
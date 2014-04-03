/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.ModuleView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'div',

		template: _.template($('#module-template').html()),

		events: {

		},

		initialize: function () {
			this.exams = this.model.get('exams');
			
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.exams, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
		},

		render: function () {
			this.model.setGrade();
			if (this.model.changed.id !== undefined) {
				return;
			}

			this.$el.html(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			this.$output = this.$('.view');
			this.$el.toggleClass('view', this.model.get('completed'));
			this.$input.toggleClass('hidden');
			
			this.$examlist = this.$('.exams');
			
			this.exams.each(function(exam) {
				var view = new app.ExamView({ model: exam });
				this.$examlist.append(view.render().el);
			}, this);
			
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

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			//this.$el.addClass('editing');
			this.switchMode();
		},
		
		switchMode: function() {
			this.$input.toggleClass('hidden');
			this.$output.toggleClass('hidden');
		},

		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			if (!this.$el.hasClass('editing')) {
				return;
			}

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });

				if (value !== trimmedValue) {
					this.model.trigger('change');
				}
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		}
	});
})(jQuery);
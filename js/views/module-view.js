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

			this.$el.html(this.template(this.model.toJSON()));
			this.$input = this.$('.edit');
			this.$output = this.$('.view');
			this.$input.toggleClass('hidden');
			
			this.$examlist = this.$('.exams');
			
			this.exams.each(function(exam) {
				var view = new app.ExamView({ model: exam });
				this.$examlist.append(view.render().el);
			}, this);
			
			//pass on grade change event to update dependent views
			app.gradeSheet.trigger('change');
			
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
		}
	});
})(jQuery);
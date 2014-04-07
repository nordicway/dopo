/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.ODSIncomingView = Backbone.View.extend({
		el: '#ods-incoming',

		template: _.template($('#ods-template').html()),

		events: {
			'change': 'setGrades'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.getGrades);
			this.$odsText = $('#ods-incoming'); 
		},
		
		setGrades: function() {
			this.save();
			this.model.trigger('change');
		},
		
		loadTestData: function() {
			this.model.loadTestData();
		},
		
		getGrades: function() {
			this.$odsText.val(this.model.get('text'));
			this.model.getGrades();
		},

		render: function () {
			this.$el.val(this.template(this.model.toJSON()));
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.$input = this.$('.edit');
			return this;
		},

		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		save: function () {
			var value = this.el.value;
			
			var trimmedValue = value.trim();

			if (trimmedValue) {
				this.model.set("text", trimmedValue);
				this.model.save();

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

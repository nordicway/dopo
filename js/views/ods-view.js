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
		},
		
		
		close: function () {
			var value = this.$input.val();
			var trimmedValue = value.trim();

			// We don't want to handle blur events from an item that is no
			// longer being edited. Relying on the CSS class here has the
			// benefit of us not having to maintain state in the DOM and the
			// JavaScript logic.
			if (!this.$el.hasClass('editing')) {
				return;
			}

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });

				if (value !== trimmedValue) {
					// Model values changes consisting of whitespaces only are
					// not causing change to be triggered Therefore we've to
					// compare untrimmed version with a trimmed one to check
					// whether anything changed
					// And if yes, we've to trigger change event ourselves
					this.model.trigger('change');
				}
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		}
	});
})(jQuery);

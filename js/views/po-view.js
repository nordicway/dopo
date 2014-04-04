/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.POView = Backbone.View.extend({
		el: '#po-selector',

		template: _.template($('#po-template').html()),

		events: {
			'change' : 'select'
		},

		initialize: function () {
			this.collection = app.POs;
			this.listenTo(this.collection, 'all', this.render);
			//set default PO
			app.selectedPO.set("name", "Master Informatik (MPO 2005)");
			
			
		},

		render: function () {

			var po_select_template = _.template($("#po-select").html(), {
	            rules: this.collection
	        });
	        $('#po-selector').html(po_select_template);
			return this;
		},

		select: function (val) {
			app.selectedPO.set("name", this.$("#po-select").val());
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

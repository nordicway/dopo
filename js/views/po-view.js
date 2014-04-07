/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	app.POView = Backbone.View.extend({
		el: '#po-selector',
		defaultPO: 'Master Informatik (MPO 2005)',

		template: _.template($('#po-template').html()),

		events: {
			'change' : 'select'
		},
		
		initialize: function () {
			this.collection = app.POs;
			this.listenTo(this.collection, 'all', this.render);
			//set default PO
			app.selectedPO.fetchOrDefault(this.defaultPO);
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
		}
		
	});
})(jQuery);

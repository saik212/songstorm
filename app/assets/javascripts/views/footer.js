Songstorm.Views.Footer = Backbone.View.extend({
	template: JST["shared/footer"],

	initialize: function () {
		this.render();
	},

	render: function () {
		var content = this.template({
			currentUser: Songstorm.currentUser
		});
	this.$el.html(content);
	return this;
	}

})
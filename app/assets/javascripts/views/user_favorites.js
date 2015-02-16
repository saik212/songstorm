Songstorm.Views.UserFavorites = Backbone.View.extend({
	template: JST["users/favorites"],

	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render);
	},

	render: function () {
		var content = this.template({likes: this.collection});
		this.$el.html(content);
		return this;
	}
})
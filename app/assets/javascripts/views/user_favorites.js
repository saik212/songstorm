Songstorm.Views.UserFavorites = Backbone.View.extend({
	template: JST["users/favorites"],

	initialize: function () {
		// console.log(this.collection);
	},

	render: function () {
		// debugger
		var content = this.template({likes: this.collection});
		this.$el.html(content);
		return this;
	}
})
Songstorm.Views.Header = Backbone.View.extend({
	template: JST["shared/header"],

	initialize: function (options) {
		this.listenTo(Songstorm.currentUser, "signIn signOut", this.render);
		this.render();
	},

	events: {
		"click #sign-out-link": "signOut"
	},


	render: function () {
		var content = this.template({
			currentUserId: Songstorm.currentUser.id
		});

		this.$el.html(content);

		return this;
	},

	signOut: function (event) {
		event.preventDefault();

		Songstorm.currentUser.signOut({
			success: function () {
				Backbone.history.navigate("session/new", {trigger: true});
			}
		});
	}
});
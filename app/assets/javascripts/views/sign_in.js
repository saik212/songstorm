Songstorm.Views.SignIn = Backbone.View.extend({
	template: JST["shared/sign_in"],

	initialize: function (options) {
		this.callback = options.callback;
		this.listenTo(Songstorm.currentUser, "signIn", this.signInCallback);
	},

	events: {
		"submit form": "submit"
	},

	render: function () {
		var content = this.template;
		this.$el.html(content);
		return this;
	},

	submit: function (event) {
		event.preventDefault();
		var $form = $(event.currentTarget);
		var formData = $form.serializeJSON().user;

		Songstorm.currentUser.signIn({
			username: formData.username,
			password: formData.password,
			error: function () {
				alert("Wrong user info combination.");
			}
		});
	},

	signInCallback: function (event) {
		if (this.callback) {
			this.callback();
		} else {
			Backbone.history.navigate("users/"+Songstorm.currentUser.id, {trigger: true});
		}
	}
})
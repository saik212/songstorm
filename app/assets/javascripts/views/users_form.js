Songstorm.Views.UsersForm = Backbone.View.extend({
	template: JST["users/form"],

	initialize: function (options) {
		this.listenTo(this.model, "sync change", this.render);;
	},

	render: function () {
		var content = this.template({
			user: this.model
		});

		this.$el.html(content);
		return this;
	},

	events: {
		"submit form": "submit"
	},

	submit: function (event) {
		event.preventDefault();

		var $form = $(event.currentTarget);
		var dataInfo = $form.serializeJSON().user;
		var that = this;

		this.model.set(dataInfo);
		this.model.save({}, {
			success: function () {
				Songstorm.currentUser.fetch();
				that.collection.add(that.model, {merge: true});
				Backbone.history.navigate("users/"+that.model.id, {trigger: true});
			},
			error: function (data) {
				alert("Invalid Form Data");
				console.log(data);
			}
		})
	}
});
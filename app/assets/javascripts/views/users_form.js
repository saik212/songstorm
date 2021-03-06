Songstorm.Views.UsersForm = Backbone.View.extend({
	template: JST["users/form"],
	className: "group",
	id: "sign-up-wrapper",

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
		"click .sign-in-button": "submit",
		"change #input-post-image": "fileInputChange"
	},

	submit: function (event) {
		event.preventDefault();

		var $form = $(".user-sign-in");
		var dataInfo = $form.serializeJSON().user;
		var that = this;

		this.model.set(dataInfo);
		this.model.save({}, {
			success: function () {
				Songstorm.currentUser.fetch();
				that.collection.add(that.model, {merge: true});
				alert("Welcome");
				Backbone.history.navigate("users/"+that.model.id, {trigger: true});
			},
			error: function (data) {
				alert("Invalid Form Data");
				console.log(data);
			}
		});
		alert('hi');

	},

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      that.model._image = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete this.model._image;
    }
  },
});

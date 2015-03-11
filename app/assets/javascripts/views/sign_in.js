Songstorm.Views.SignIn = Backbone.View.extend({
	template: JST["shared/sign_in"],
	className: "group landing-wrapper",

	initialize: function (options) {
		this.callback = options.callback;
		this.listenTo(Songstorm.currentUser, "signIn", this.signInCallback);

		this.previewNum = Math.floor(Math.random()*Songstorm.songs.length);
		this.previewSong = Songstorm.songs.toJSON()[this.previewNum].song;
	},

	events: {
		"click .sign-in-button": "submit",
		"click .sign-in-guest": "guestSignIn",
		"click #preview-play": "playSong"
	},

  playSong: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    Songstorm.playQueue.push(Songstorm.songs.getOrFetch(this.previewSong.id));
    Songstorm.globalPlayer.playQueue();
  },

	guestSignIn: function(event) {
		var guestNames = ['Pikachu', "Squirtle", "Guy Pearce", "Bulbasaur", "Charmander" ];
		var guestIndex = Math.floor(Math.random() * guestNames.length);
		var userInfo = {username: guestNames[guestIndex], password: "123456"};
		var that = this;

		var newUser = new Songstorm.Models.User();
		newUser.set(userInfo);
		newUser.save({}, {
			success: function () {
				Songstorm.currentUser.fetch();
				Songstorm.users.add(newUser);
				Backbone.history.navigate("users/"+newUser.id, {trigger:true});
			}
		});
	},

	render: function () {
		var content = this.template({
			songTitle: this.previewSong.title,
			imageUrl: this.previewSong.image_url,
			audioUrl: this.previewSong.audio_url,
			songArtist: this.previewSong.artist,
			songAlbum: this.previewSong.album,
			songId: this.previewSong.id
		});
		this.$el.html(content);
		return this;
	},

	submit: function (event) {
		event.preventDefault();
		var $form = $(".user-sign-in");
		var formData = $form.serializeJSON().user;
		Songstorm.currentUser.signIn({
			username: formData.username,
			password: formData.password,
			error: function () {
				// alert("Wrong user info combination.");
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

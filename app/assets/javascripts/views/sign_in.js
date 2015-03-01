Songstorm.Views.SignIn = Backbone.View.extend({
	template: JST["shared/sign_in"],
	className: "group landing-wrapper",

	initialize: function (options) {
		this.callback = options.callback;
		this.listenTo(Songstorm.currentUser, "signIn", this.signInCallback);
	},

	events: {
		"click .sign-in-button": "submit",
		"click .sign-in-guest": "guestSignIn",
		"click #preview-play": "playSong"
	},

  playSong: function (event) {
    event.preventDefault();
    Songstorm.playQueue = [];
    var songUrl = $(event.currentTarget).data("song-url");
    Songstorm.playQueue.push(songUrl);
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
		var previewNum = Math.floor(Math.random()*Songstorm.songs.length);
		var previewSong = Songstorm.songs.toJSON()[previewNum].song;
		console.log(previewSong);
		var content = this.template({
			songTitle: previewSong.title,
			imageUrl: previewSong.image_url,
			audioUrl: previewSong.audio_url,
			songArtist: previewSong.artist,
			songAlbum: previewSong.album,
			songId: previewSong.id
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

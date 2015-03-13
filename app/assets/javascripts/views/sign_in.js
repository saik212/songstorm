
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
		var guestIndex = Math.floor(Math.random() * 1000);
		var userInfo = {username: "Guest"+guestIndex, password: "123456", image_url: "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img5.jpg"};
		var that = this;

		var newUser = new Songstorm.Models.User();
		newUser.set(userInfo);
				$(".sign-in-guest").on("click", false);
		newUser.save({}, {
			success: function () {
				Songstorm.currentUser.fetch({
					success: function () {
						that.guestSongs(newUser);
					}
				});
				Songstorm.users.add(newUser);
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
				alert("Wrong user info combination.");
			}
		});
		$(".landing-sign-in").append("<img src='https://s3.amazonaws.com/songstorm-pics/seeds/spinner.gif'>");
	},

	signInCallback: function (event) {
		if (this.callback) {
			this.callback();
		} else {
			Backbone.history.navigate("users/"+Songstorm.currentUser.id, {trigger: true});
		}
	},

	guestSongs: function (guest) {
		var that = this;
		var song_urls = ["https://s3.amazonaws.com/songstorm-pics/seeds/songs/guest1.mp3",
							  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/guest2.mp3"];

			var song1 = new Songstorm.Models.Song;
			song1.set({title: "Frozen Ray", artist: "Takayuki Ishikawa", album: "Unknown", audio: song_urls[0]});
			song1.save({}, {
				success: function () {
					Songstorm.songs.add(song1);
					var song2 = new Songstorm.Models.Song;
					song2.set({title: "Tricksy Clock", artist: "Yoko Shinomura", album: "KH1", audio: song_urls[1]});
					song2.save({}, {
						success: function () {
							Songstorm.songs.add(song2);
							that.guestPlaylists(guest);
						}
					});
				}
			});
	},

	guestPlaylists: function (guest) {
		var that = this;
		var playlist = new Songstorm.Models.Playlist;
		playlist.set({name: guest.escape('username')+"'s Playlist"});
		playlist.save({}, {
			success: function (){
				Songstorm.playlists.add(playlist);
				for (var i = 0; i<5; i++) {
					var playlistSong = new Songstorm.Models.PlaylistSong;
					playlistSong.save({song_id: i, playlist_id: playlist.id}, {
						success: function () {
							Songstorm.playlistSongs.add(playlistSong);
						}
					})
				}
			}
		});
	}
})

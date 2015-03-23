Songstorm.Views.Modal = Backbone.View.extend ({
	initialize: function (options) {

		this.currentModel = null;
		this.editing = false;
		this.editCallback = null;
	},

	events: {
		"click .open-modal": "showModal",
		"click .close-modal": "hideModal",
		"click .close-btn": "hideModal",
		"change #file-sg": "audioInputChange",
		"change #file-img": "imageInputChange",
		"click #sign-in-modal": "showSignIn",
		"click #user-sign-in": "signIn",
		"click #user-sign-up": "signUp",
		"click #add-pl": "addPlaylist",
		"click #create-pl": "createPlaylist",

		"click #upld-sg": "uploadSong",
		"click #user-edit-btn": "editUser",

		"click #guest-btn": "guestSignIn"

	},


// __________
// __________
// __________ General functions for view
// __________
// __________

	showModal: function () {
		$(".modal-wrapper").fadeIn(150);
		$(".modal-wrapper").toggleClass("closed");
	},

	hideModal: function (event) {
		if (event) {
			event.preventDefault();
		}

		$(".modal-wrapper").fadeOut(150);
		$(".modal-wrapper").toggleClass("closed", function() {  $(".form-wrapper").empty();  });
	},


	showForm: function (options) {
		var that = this;

		if ( Songstorm.currentUser.isSignedIn() ) {

			var template = JST["modals/" + options.template];

			this.currentModel = options.model;

			$(".form-wrapper").html( template({ model: this.currentModel }) );

			if (options.formWelcome) {
				$(".form-welcome").text(options.formWelcome);
			}

			if (this.editing) {
				$(".submit-btn").text("Update");
				$(".req-star").remove();
			}

			this.showModal();

		} else {
			this.showSignIn();
		}
	},




	postModel: function (options) {
		var that = this;
		var formData = $(".modal-form").serializeJSON();
		

		if (options._type === "user") {
			formData = formData.user;
		}

		if (options._type === "song") {
			formData = formData.song;
		}

		if (options._type === "playlist") {
			formData = formData.playlist;
		}



		this.currentModel.set(formData);
		this.currentModel.save({}, {
			success: function () {
				that.postSuccess({

					notice: options.notice,
					collections: options.collections,
					model: that.currentModel,
					url: options.url

				});
			},

			error: function (req, resp) {
				that.showErrors(resp);
			}

		});
	},



	postSuccess: function (options) {
		var that = this;

		this.showNotice(options.notice);

		if (!this.editing) {

			options.collections.forEach(function (collection) {
				collection.add(options.model, {merge: true});
			});
			
		}


		setTimeout(function () {
			that.hideModal();

			if (that.editing) {
				that.editCallback(that.currentModel.id);
			} else {	
				Backbone.history.navigate(options.url+"/"+options.model.id, {trigger: true});
			}

		}, 1250)

	},

	showNotice: function (notice) {
	var message = $("<h1>");

	if (this.editing) {
		message.text("Successfully Updated").addClass("notice notice-success");
	} else {
		message.text(notice).addClass("notice notice-success");
	}

	$(".form-wrapper").append(message);
	},

  showErrors: function (errors) {
	errors = errors.responseJSON || errors;

	errors.forEach(function (error) {
		var message = $("<h1>").text(error).addClass("notice notice-error");

		$(".form-wrapper").append(message);
	});
  },


	removeNotices: function () {
		$(".notice").remove();
	},





// __________
// __________
// __________ File Upload functions
// __________
// __________

	fileInputChange: function(options){
    var that = this;

    var file = options.file;

    var reader = new FileReader();
    reader.onloadend = function(){

      if (options.modelFile === "audio") {
	      that.currentModel._audio = reader.result;
      } else {
	      that.currentModel._image = reader.result;
      }
    }


    if (file) {
      reader.readAsDataURL(file);
    } else {
    	if (options.modelFile === "audio") {
	      delete this.currentModel._audio;
      } else {
	      delete this.currentModel._image;
      }
    }
  },

  audioInputChange: function (event) {
  	event.preventDefault();

  	var file = event.currentTarget.files[0];
  	this.fileInputChange({
  		file: file,
  		modelFile: "audio"
  	});


  },

  imageInputChange: function (event) {
  	event.preventDefault();

  	var file = event.currentTarget.files[0];
  	this.fileInputChange({
  		file: file,
  		modelFile: "image"
  	});

  	
  },



// __________
// __________
// __________ Sign in stuff
// __________
// __________


	showSignIn: function () {
		var template = JST["modals/sign_in"];
		$(".form-wrapper").html(template);
		this.showModal();
	},

	signIn: function (event) {
		event.preventDefault();
		var that = this;

		this.removeNotices();

		var $form = $(".modal-form");
		var formData = $form.serializeJSON().user;

		Songstorm.currentUser.signIn({
			username: formData.username,
			password: formData.password,

			success: function () {
				that.hideModal();
			},
			error: function (req, resp) {
				that.showErrors(["Invalid Credentials"]);
			}
		});
	},



// __________
// __________
// __________  Sign up stuff
// __________
// __________

showSignUp: function () {
  	var that = this;
  	var template = JST["modals/sign_up"];

  	var newUser = new Songstorm.Models.User;
  	this.currentModel = newUser;


  	$(".form-wrapper").html(template);
  	this.showModal();
  },

  signUp: function (event) {
  	event.preventDefault();
  	var that = this;

  	$(".notice").remove();

  	var dataInfo = $(".modal-form").serializeJSON().user;

  	if (dataInfo.password === $("#pass-check").val()) {
  		this.currentModel.set(dataInfo);
  		this.currentModel.save({}, {

  			success: function (req, resp) {
  				Songstorm.currentUser.fetch({
  					success: function () {
  						that.hideModal();
  					}
  				});
  				Songstorm.users.add(that.currentModel, {merge: true});
  			},

  			error: function (req, resp) {
  				that.showErrors(resp);
  			}

  		});

  	} else {
  		$(".form-wrapper").append($("<h1>").text("Passwords don't match").addClass("notice notice-error"));
  	}

  },


// __________
// __________
// __________ User Edit
// __________
// __________


	showEditUser: function (id) {
		var user = Songstorm.users.get(id);
		this.editing = true;


		this.showForm({
			template: "user_edit",
			model: user
		})


	},

	editUser: function (event) {
		event.preventDefault();

		this.removeNotices();

		this.postModel({
			notice: "Update Successful",
			collections: [Songstorm.users],
			model: this.currentModel,
			url: "users",
			_type: "user"
		});

	},



// __________
// __________
// __________ Song Uploads
// __________
// __________


	showUpload: function() {
		var song = new Songstorm.Models.Song;

		this.showForm({
			template: "song_new",
			model: song,
		});

	},

	uploadSong: function (event) {
		event.preventDefault();
		var that = this;

		this.removeNotices();

		this.postModel({
			notice: "Upload successful!",
			collections: [Songstorm.songs],
			model: that.currentModel,
			url: "songs",
			_type: "song"
		});

	},

	showEditUpload: function (id) {
		var song = Songstorm.songs.get(id);
		this.editing = true;

		this.showForm({
			template: "song_new",
			model: song,
			formWelcome: "Edit your song"
		});

	},





// __________
// __________
// __________ Create Playlists
// __________
// __________



	showCreatePlaylist: function () {
		var that = this;
		var template;

		var playlist = new Songstorm.Models.Playlist;

		this.showForm({
			template: "playlist_form",
			model: playlist
		});
	},

	createPlaylist: function (event) {
		event.preventDefault();
		var that = this;


		this.removeNotices();

		this.postModel({
			notice: "Playlist created!",
			collections: [Songstorm.playlists],
			model: that.currentModel,
			url: "playlists",
			_type: "playlist"
		});

	},

	showEditPlaylist: function (id) {
		var playlist = Songstorm.playlists.get(id);
		this.editing = true;

		this.showForm({
			template: "playlist_form",
			model: playlist,
			formWelcome: "Edit your playlist"
		});
	},











// __________
// __________
// __________ Add Songs to Playlists
// __________
// __________


	showAddPlaylist: function (options) {
		var that = this;
		var template;

		var sgId = options.sgId;
		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/add_playlist_form"];
			$(".form-wrapper").html(template);
			Songstorm.playlists.forEach(function (playlist) {
				$("#add-pl-wrapper select").append(
					"<option data-sg-id='"+sgId+"' value="+playlist.id+" >"+playlist.escape("name")+"</option>"
					);
			})
			this.showModal();
		} else {
			this.showSignIn();
		}
	},

	addPlaylist: function (event) {
    event.preventDefault();
    var that = this;

    var plId = parseInt($("#pl-sg-id").val());
    var sgId = $("#pl-sg-id option").data("sg-id");
    var playlist = Songstorm.playlists.get(plId);
    var playlistSong = new Songstorm.Models.PlaylistSong({song_id: sgId, playlist_id: plId});

    playlistSong.save({}, {

      success: function (model) {
      	var addNotice = $(".notice");
      	addNotice.text("Added song to "+ playlist.escape("name") + "!").css({"text-align":"center", "color": "#580B77", "margin-top": "5px"});


      	$(".form-wrapper").append(addNotice);
      	setTimeout(function () {
	      	that.hideModal();
	        Backbone.history.navigate("#/songs/"+sgId, {trigger: true});
      	}, 1250);
      },

      error: function (req, resp) {
      	that.showErrors(["Something went wrong. =["])
      }

    });

	},


// __________
// __________
// __________  Guest sign in
// __________
// __________


	guestSignIn: function(event) {
		var images = ["https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img3.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img4.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img5.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img6.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img7.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img8.jpg",
								  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img9.jpg"];
		var randomImage = images[Math.floor(Math.random() * images.length)];
		var guestIndex = Math.floor(Math.random() * 1000);
		var userInfo = {username: "Guest"+guestIndex, password: "123456", image_url: randomImage};
		var that = this;

		var newUser = new Songstorm.Models.User();
		newUser.set(userInfo);
				$(".sign-in-guest").on("click", false);
		newUser.save({}, {
			success: function () {
				Songstorm.currentUser.fetch({
					success: function () {
						that.hideModal();
						that.guestSongs(newUser);
					}
				});
				Songstorm.users.add(newUser);
			}
		});
	},

	guestSongs: function (guest) {
		var that = this;
		var song_urls = ["https://s3.amazonaws.com/songstorm-pics/seeds/songs/guest1.mp3",
							  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/guest2.mp3"];

			var song1 = new Songstorm.Models.Song;
			song1.set({title: "Frozen Ray", artist: "Takayuki Ishikawa", album: "Unknown", audio: song_urls[0]});
			song1.save({}, {
				success: function () {
					guest.songs().add(song1)
					Songstorm.songs.add(song1);
					var song2 = new Songstorm.Models.Song;
					song2.set({title: "Tricksy Clock", artist: "Yoko Shinomura", album: "KH1", audio: song_urls[1]});
					song2.save({}, {
						success: function () {
							guest.songs().add(song2)
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
				guest.playlists().add(playlist);
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





  




});





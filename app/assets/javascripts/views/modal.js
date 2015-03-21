Songstorm.Views.Modal = Backbone.View.extend ({
	initialize: function (options) {
		// alert("Modal Online");
		this.currentModel;
	},

	events: {
		"click .open-modal": "showModal",
		"click .close-modal": "hideModal",
		"click .close-btn": "hideModal",
		"change .file-upld": "fileInputChange",
		"click #sign-in-modal": "showSignIn",
		"click #user-sign-in": "signIn",
		"click #user-sign-up": "signUp",
		"click #add-pl": "addPlaylist",
		"click #create-pl": "createPlaylist"
	},

	showModal: function () {
		$(".modal-wrapper").fadeIn(150);
		$(".modal-wrapper").toggleClass("closed");
	},

	hideModal: function (event) {
		if (event) {
			event.preventDefault();
		}

		$(".modal-wrapper").fadeOut(150);
		$(".modal-wrapper").toggleClass("closed");
	},

	showSignIn: function (options) {
		// if (event) {
		// 	event.preventDefault();
		// }

		console.log(options);

		// $(".form-wrapper").empty();
		var template = JST["modals/sign_in"];
		$(".form-wrapper").empty().html(template);
		this.showModal();
	},

	signIn: function (event, options) {
		event.preventDefault();
		var that = this;
		console.log(options);
		var $form = $(".modal-form");
		var formData = $form.serializeJSON().user;
		Songstorm.currentUser.signIn({
			username: formData.username,
			password: formData.password,
			success: function () {
				that.hideModal();
			},
			error: function () {
				alert("Wrong user info combination.");
			}
		});
	},

	showUpload: function(event) {
		if (event) {
			event.preventDefault();
		}
		var that = this;
		var template;


		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/upload_song"];
			$(".form-wrapper").empty().html(template);
			this.showModal();
		} else {
			this.showSignIn();
		}
	},

	showCreatePlaylist: function () {
		var that = this;
		var template;

		var playlist = new Songstorm.Models.Playlist;
		this.currentModel = playlist;

		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/playlist_form"];
			$(".form-wrapper").empty().html(template);
			this.showModal();
		} else {
			this.showSignIn();
		}
	},

	createPlaylist: function (event) {
		event.preventDefault();
		var that = this;


		var formData = $(".modal-form").serializeJSON().playlist;
		var playlist = this.currentModel;

		playlist.set(formData);
		playlist.save({}, {
			success: function () {
      	var addNotice = $("<h1>");
      	addNotice.text("Created "+ playlist.escape("name") + "!").css({"text-align":"center", "color": "#580B77", "margin-top": "5px"});


      	$(".form-wrapper").append(addNotice);
      	setTimeout(function () {
	      	that.hideModal();
	      	Songstorm.playlists.add(that.currentModel, {merge: true});
	        Backbone.history.navigate("#/playlists/"+playlist.id, {trigger: true});
      	}, 1250);
			},

			error: function () {
				alert("Couldn't create playlist for some reason");
			}
		})

	},

	showAddPlaylist: function (options) {
		var that = this;
		var template;

		var sgId = options.sgId;
		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/add_playlist_form"];
			$(".form-wrapper").empty().html(template);
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

      error: function () {
      	alert("Something went wrong. Please try again later.")
      }

    });

	},

	fileInputChange: function(event){
		alert("File Input Change!!");
    var that = this;

    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      console.log(reader.result)
      that.currentModel._image = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
      debugger
    } else {
      delete this.currentModel._image;
    }
  },



  showSignUp: function () {
  	var that = this;
  	var template = JST["modals/sign_up"];

  	var newUser = new Songstorm.Models.User;
  	this.currentModel = newUser;


  	$(".form-wrapper").empty().html(template);
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
  				resp.responseJSON.forEach(function (eMessage) {
  					var err = $("<h1>").text(eMessage).addClass("notice notice-error");

  					$(".form-wrapper").append(err);
  				});
  			}

  		});

  	} else {
  		$(".form-wrapper").append($("<h1>").text("Passwords don't match").addClass("notice notice-error"));
  	}

  }

});
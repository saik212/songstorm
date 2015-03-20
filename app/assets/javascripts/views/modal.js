Songstorm.Views.Modal = Backbone.View.extend ({
	initialize: function () {
		// alert("Modal Online");
	},

	events: {
		"click .open-modal": "showModal",
		"click .close-modal": "hideModal",
		"click .close-btn": "hideModal",
		"click #sign-in-modal": "showSignIn",
		"click #user-sign-in": "signIn",
		"click #add-pl": "addPlaylist"
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
			this.showSignIn({callback: that.showUpload});
			// return;
		}
	},

	showCreatePlaylist: function () {
		var that = this;
		var template;

		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/playlist_form"];
			$(".form-wrapper").empty().html(template);
			this.showModal();
		} else {
			this.showSignIn();
			// return;
		}
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
      	var addNotice = $("<h1>");
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

});
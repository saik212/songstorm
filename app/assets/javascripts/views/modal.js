Songstorm.Views.Modal = Backbone.View.extend ({
	initialize: function (options) {
		// alert("Modal Online");
		this.currentModel;
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

		"click #upld-sg": "uploadSong"

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
		$(".modal-wrapper").toggleClass("closed", function() {  $(".form-wrapper").empty();  });
	},


	showForm: function (options) {
		var that = this;

		if ( Songstorm.currentUser.isSignedIn() ) {

			var template = JST["modals/" + options.template];

			this.currentModel = options.model;

			$(".form-wrapper").html(template);
			this.showModal();

		} else {
			this.showSignIn();
		}
	},






	showSignIn: function () {
		// if (event) {
		// 	event.preventDefault();
		// }

		// console.log(options);

		// $(".form-wrapper").empty();
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
			url: "songs"
		});

		// var formData = $(".modal-form").serializeJSON().song;
		// this.currentModel.set(formData);
		// this.currentModel.save({}, {
		// 	success: function () {
		// 		that.postSuccess({

		// 			notice: "Success! Uploaded '" + that.currentModel.escape("title") + "'",
		// 			collections: [Songstorm.songs],
		// 			model: that.currentModel,
		// 			url: "songs"

		// 		});
		// 	},

		// 	error: function (req, resp) {
		// 		that.showErrors(resp);
		// 	}

		// });

	},

	postSuccess: function (options) {
		var that = this;

		this.showNotice(options.notice);

		options.collections.forEach(function (collection) {
			collection.add(options.model, {merge: true});
		});

		setTimeout(function () {
			that.hideModal();
			Backbone.history.navigate(options.url+"/"+options.model.id, {trigger: true});
		})

	},

	showNotice: function (notice) {
		// add to .form-wrapper
		var message = $("<h1>");
		message.text(notice).addClass("notice notice-success");

		$(".form-wrapper").append(message);
	},


	postModel: function (options) {
		var that = this;

		var formData = $(".modal-form").serializeJSON().song;

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

	removeNotices: function () {
		$(".notice").remove();
	},













	showCreatePlaylist: function () {
		var that = this;
		var template;

		var playlist = new Songstorm.Models.Playlist;
		this.currentModel = playlist;

		if (Songstorm.currentUser.isSignedIn()) {
			template = JST["modals/playlist_form"];
			$(".form-wrapper").html(template);
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

	fileInputChange: function(options){
		alert("File Input Change!!");
		alert(options.modelFile);
    var that = this;

    // var file = event.currentTarget.files[0];
    var file = options.file;

    var reader = new FileReader();
    reader.onloadend = function(){
      console.log(reader.result)
      // that.currentModel._image = reader.result;
      if (options.modelFile === "audio") {
	      that.currentModel._audio = reader.result;
      } else {
	      that.currentModel._image = reader.result;
      }
      debugger
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
    debugger
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


  showErrors: function (errors) {
  	errors = errors.responseJSON || errors;

  	errors.forEach(function (error) {
  		var message = $("<h1>").text(error).addClass("notice notice-error");

  		$(".form-wrapper").append(message);
  	})
  }

});





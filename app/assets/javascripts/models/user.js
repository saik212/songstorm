Songstorm.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  toJSON: function(){
    // We want proper namespacing of our attributes in Rails.
    var json = {user: _.clone(this.attributes)};

    if (this._image) {
      json.user.image = this._image;
    }

    return json;
  },

  songs: function () {
  	if (!this._songs) {
  		this._songs = new Songstorm.Collections.Songs({
  			user: this
  			// url: "/api/users/" + this.id +"/songs"
  		});
  	}
    return this._songs;
  },

  playlists: function () {
    if (!this._playlists) {
      this._playlists = new Songstorm.Collections.Playlists({
        user: this
        // url: "/api/users/" + this.id + "/playlists"
      });
    }
    return this._playlists;
  },

  likedSongs: function () {
    if (!this._likedSongs) {
      this._likedSongs = new Songstorm.Collections.Likes({
        user: this
      });
    }
  	return this._likedSongs;
  },

  parse: function (response) {
  	if (response.songs) {
  		this.songs().set(response.songs, {parse: true});
  		delete response.songs;
  	}
  	if (response.playlists) {
  		this.playlists().set(response.playlists, {parse: true});
  		delete response.playlists;
  	}
    if (response.liked_songs) {
      this.likedSongs().set(response.liked_songs, {parse: true});
      delete response.liked_songs;
    }

  	return response;
  }

});


Songstorm.Models.CurrentUser = Backbone.Model.extend({
  url: "/api/session",

  initialize: function (options) {
    this.listenTo(this, "change", this.fireSessionEvent);
  },

  fireSessionEvent: function () {
    if (this.isSignedIn) {
      this.trigger('signIn');
      // console.log("CurrentUser is signed in!", this);
    } else {
      this.trigger("signOut");
      // console.log("CurrentUser is signed out!", this);
    }
  },

  isSignedIn: function () {
    return !this.isNew();
  },

  signIn: function (options) {
    var model = this;
    var credentials = {
      "user[username]": options.username,
      "user[password]": options.password
    };

    $.ajax({
      url: this.url,
      type: "POST",
      data: credentials,
      dataType: "json",
      success: function (data) {
        model.set(data);
        options.success && options.success();        
      },
      error: function () {
        options.error && options.error();
      }
    });
  },

  signOut: function (options) {
    var model = this;

    $.ajax({
      url:  this.url,
      type: "DELETE",
      dataType: "json",
      success: function (data) {
        model.clear();
        options.success && options.success();
      }
    });
  }
});
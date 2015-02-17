Songstorm.Models.Playlist = Backbone.Model.extend({
  urlRoot: "/api/playlists",

   toJSON: function(){
    var json = {playlist: _.clone(this.attributes)};

    if (this._image) {
      json.playlist.image = this._image;
    }

    return json;
  },

  uploader: function () {
    if (!this._uploader) {
      this._uploader = new Songstorm.Models.User();
    }
    return this._uploader;
  },

  songs: function () {
  	if (!this._songs) {
  		this._songs = new Songstorm.Collections.Songs([], {
  			playlist: this,
  			// urlRoot: "/api/playlists/" + this.id +"/songs"
  		});
  	}
  	return this._songs;
  },

  playlistSongs: function () {
    if (!this._playlistSongs) {
      this._playlistSongs = new Songstorm.Collections.PlaylistSongs([], {
        playlist: this,
        // urlRoot: "/api/playlist_songs/" + this.id +"/songs"
      });
    }
    return this._playlistSongs;
  },

  parse: function (response) {
  	if (response.songs) {
  		this.songs().set(response.songs);
  		delete response.songs;
  	}

    if (response.playlist_songs) {
      this.playlistSongs().set(response.playlist_songs, { parse: true });
      delete response.playlist_songs;
    }

    if (response.uploader) {
      this.uploader().set(response.uploader, {parse: true});
      delete response.uploader;
    }

  	return response;
  },

  // initialize: function (options) {
 	// this.urlRoot = options.urlRoot || this.urlRoot;
  // }
})

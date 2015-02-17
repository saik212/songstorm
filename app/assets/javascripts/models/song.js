Songstorm.Models.Song = Backbone.Model.extend({
  urlRoot:"api/songs",

  toJSON: function () {
    var json = {song: _.clone(this.attributes)};

    if (this._audio) {
      json.song.audio = this._audio;
    }

    if (this._image) {
      json.song.image = this._image;
    }

    return json;
  },

  playlists: function () {
  	if (!this._playlists) {
  		this._playlists = new Songstorm.Collections.Playlists({
  			song: this
  		});
  	}
  	return this._playlists;
  },

  playlistSongs: function () {
    if (!this._playlistSongs) {
      this._playlistSongs = new Songstorm.Collections.PlaylistSongs({
        song: this
      });
    }
    return this._playlistSongs;
  },

  comments: function () {
    if (!this._comments) {
      this._comments = new Songstorm.Collections.Comments({
        song: this
      });
    }
    return this._comments;
  },

  parse: function (response) {
  	if (response.playlists) {
  		this.playlists().set(response.playlists);
  		delete response.playlists;
  	}
    if (response.playlistSongs) {
      this.playlistSongs().set(response.playlistSongs, { parse: true });
      delete response.playlistSongs;
    }

    if (response.comments) {
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

  	return response;
  },


  // initialize: function (options) {
 	// this.urlRoot = options.urlRoot || this.urlRoot;
  // }
})

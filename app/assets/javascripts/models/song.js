Songstorm.Models.Song = Backbone.Model.extend({
  urlRoot:"api/songs",

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

  parse: function (response) {
  	if (response.playlists) {
  		this.playlists().set(response.playlists);
  		delete response.playlists;
  	}
    if (response.playlistSongs) {
      this.playlistSongs().set(response.playlistSongs, { parse: true });
      delete response.playlistSongs;
    }

  	return response;
  },


  // initialize: function (options) {
 	// this.urlRoot = options.urlRoot || this.urlRoot;
  // }
})

Songstorm.Models.Playlist = Backbone.Model.extend({
  urlRoot: "/api/playlists",

  songs: function () {
  	if (!this._songs) {
  		this._songs = new Songstorm.Collections.Songs([], {
  			user: this,
  			url: "/api/playlists/" + this.id +"/songs"
  		});
  	}
  	return this._songs;
  },

  parse: function (resp) {
  	if (resp.songs) {
  		this.songs().set(resp.songs);
  		delete resp.songs;
  	}

  	return resp;
  },

  // initialize: function (options) {
 	// this.urlRoot = options.urlRoot || this.urlRoot;
  // }
})

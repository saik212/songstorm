Songstorm.Models.Song = Backbone.Model.extend({
  urlRoot:"api/songs",

  playlists: function () {
  	if (!this._playlists) {
  		this._playlists = new Songstorm.Collections.Playlists([], {
  			song: this
  		});
  	}
  	return this._playlists;
  },

  parse: function (resp) {
  	if (resp.playlists) {
  		this.playlists().set(resp.playlists);
  		delete resp.playlists;
  	}

  	return resp;
  },


  // initialize: function (options) {
 	// this.urlRoot = options.urlRoot || this.urlRoot;
  // }
})

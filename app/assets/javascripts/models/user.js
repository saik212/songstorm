Songstorm.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

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

  parse: function (response) {
  	if (response.songs) {
  		this.songs().set(response.songs, {parse: true});
  		delete response.songs;
  	}
  	if (response.playlists) {
  		this.playlists().set(response.playlists, {parse: true});
  		delete response.playlists;
  	}

  	return response;
  }

})

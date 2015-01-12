Songstorm.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",

  songs: function () {
  	if (!this._songs) {
  		this._songs = new Songstorm.Collections.Songs({
  			user: this,
  			url: "/api/users/" + this.id +"/songs"
  		});
  	}
    return this._songs;
  },

  playlists: function () {
    if (!this._playlists) {
      this._playlists = new Songstorm.Collections.Playlists({
        user: this,
        url: "/api/users/" + this.id + "/playlists"
      });
    }
  	return this._playlists;
  },

  parse: function (resp) {
  	if (resp.songs) {
  		this.songs().set(resp.songs, {parse: true});
  		delete resp.songs;
  	}

  	return resp;
  }

})

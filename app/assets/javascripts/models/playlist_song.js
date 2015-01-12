Songstorm.Models.PlaylistSong = Backbone.Model.extend({
  urlRoot: "api/playlist_songs",

  

  parse: function (resp) {
  	if (resp.songs) {
  		this.songs().set(resp.songs);
  		delete resp.songs;
  	}

  	return resp;
  }
});
Songstorm.Collections.PlaylistSongs = Backbone.Collection.extend({
  url: "api/playlist_songs",
  model: Songstorm.Models.PlaylistSong,

  initialize: function (options) {
    if (options){
      this.url = options.url || this.url;
    }
  },


  getOrFetch: function (id) {
    var playlistSong = this.get(id);
    var playlistSongs = this;

    if (playlist) {
      playlist.fetch()
    } else {
      playlistSong = new Songstorm.Models.PlaylistSongs({ id: id })
      playlist.fetch({
        success: function () {
          playlistSongs.add(playlistSong);
        }
      });
    }
    return playlistSong;
  }
})

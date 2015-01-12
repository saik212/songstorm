window.Songstorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Songstorm.users = new Songstorm.Collections.Users();
    Songstorm.users.fetch();
    Songstorm.playlists = new Songstorm.Collections.Playlists();
    Songstorm.playlists.fetch({
      success: function () {
      },
      error: function (resp, data) {
      }
    });
    Songstorm.playlistSongs = new Songstorm.Collections.PlaylistSongs();
    Songstorm.playlistSongs.fetch({
      success: function () {
      },
      error: function (resp, data) {
      }
    });
    Songstorm.songs = new Songstorm.Collections.Songs();
    Songstorm.songs.fetch({
      success: function () {
      },
      error: function (resp, data) {
      }
    });
    new Songstorm.Routers.Router({
      $rootEl: $("#content")
    });
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Songstorm.initialize();
});

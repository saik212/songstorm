window.Songstorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new Songstorm.Models.CurrentUser();
    this.currentUser.fetch();

    Songstorm.users = new Songstorm.Collections.Users();
    Songstorm.users.fetch();

    Songstorm.playlists = new Songstorm.Collections.Playlists();
    // Songstorm.playlists.fetch();
    Songstorm.playlistSongs = new Songstorm.Collections.PlaylistSongs();
    Songstorm.playlistSongs.fetch();

    Songstorm.songs = new Songstorm.Collections.Songs();
    Songstorm.songs.fetch();

    Songstorm.comments = new Songstorm.Collections.Comments();
    Songstorm.comments.fetch();

    Songstorm.likes = new Songstorm.Collections.Likes();
    // Songstorm.likes.fetch();

    new Songstorm.Views.Header({el: "#header"});
    // new Songstorm.Views.Footer({el: "#footer"});

    Songstorm.globalPlayer = new Songstorm.Views.MusicPlayer({
      el: "#global-player",
      rootEl: "#content"
    });

    Songstorm.modal = new Songstorm.Views.Modal({el:".modal-wrapper"});
    
    Songstorm.router = new Songstorm.Routers.Router({
      $rootEl: $("#content")
    });

    //global player playlists
    Songstorm.playQueue = [];
    
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Songstorm.initialize();
});

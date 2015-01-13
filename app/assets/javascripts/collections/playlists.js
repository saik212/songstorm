Songstorm.Collections.Playlists = Backbone.Collection.extend({
  // url: "/api/playlists",
  url: function () {
    if (this.user) {
      return "api/users/"+this.user.id+"/playlists";
    } else {
      return "/api/playlists";
    }
  },
  model: Songstorm.Models.Playlist,

  initialize: function (options) {
    if (options){
      this.url = options.url || this.url;
      this.user = options.user;
    }
  },


  getOrFetch: function (id) {
    var playlist = this.get(id);
    var playlists = this;

    if (playlist) {
      playlist.fetch()
    } else {
      playlist = new Songstorm.Models.Playlist({ id: id })
      playlist.fetch({
        success: function () {
          playlists.add(playlist);
        }
      });
    }
    return playlist;
  }
})

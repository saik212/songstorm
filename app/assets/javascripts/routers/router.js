Songstorm.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "main",
    "users/:id": "userShow",
    "playlists/new": "playlistNew",
    "playlists/:id": "playlistShow"
  },

  userShow: function (id) {
    var user = Songstorm.users.getOrFetch(id);
    var userShowView = new Songstorm.Views.UserShow({model: user});
    this._swapView(userShowView)
  },

  playlistNew: function () {
    var newPlaylist = new Songstorm.Models.Playlist();

    var playlistFormView = new Songstorm.Views.PlaylistForm({
      collection: Songstorm.playlists,
      model: newPlaylist
    })

    this._swapView(playlistFormView);

  },

  playlistShow: function (id) {
    var playlist = Songstorm.playlists.getOrFetch(id);
    var playlistShowView = new Songstorm.Views.PlaylistShow({model: playlist});
    this._swapView(playlistShowView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})

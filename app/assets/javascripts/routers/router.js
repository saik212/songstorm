Songstorm.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "main",
    "users/:id": "userShow",
    "playlists/new": "playlistNew",
    "playlists/:id": "playlistShow",
    "playlists/:id/edit": "playlistEdit",
    "songs/new": "songNew",
    "songs/:id": "songShow",
    "songs/:id/edit": "songEdit"
  },

  userShow: function (id) {
    var user = Songstorm.users.getOrFetch(id);
    // user.songs().fetch();
    user.playlists().fetch();
    var userShowView = new Songstorm.Views.UserShow({model: user});
    this._swapView(userShowView);
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
    var playlistShowView = new Songstorm.Views.PlaylistShow({ model: playlist });
    this._swapView(playlistShowView);
  },

  playlistEdit: function (id) {
    var playlist = Songstorm.playlists.getOrFetch(id);
    var playlistEditView = new Songstorm.Views.PlaylistForm({
      model: playlist,
      collection: Songstorm.playlists
    });
    this._swapView(playlistEditView);
  },

  songNew: function () {
    var newSong = new Songstorm.Models.Song();
    var songFormView = new Songstorm.Views.SongForm({
      model: newSong,
      collection: Songstorm.songs
    })

    this._swapView(songFormView)
  },

  songShow: function (id) {
    var song = Songstorm.songs.getOrFetch(id);
    var songShowView = new Songstorm.Views.SongShow({ model: song });
    this._swapView(songShowView);
  },

  songEdit: function (id) {
    var song = Songstorm.songs.getOrFetch(id);
    var songEditView = new Songstorm.Views.SongForm({
      model: song,
      collection: Songstorm.songs
    });
    this._swapView(songEditView);
   },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }


})

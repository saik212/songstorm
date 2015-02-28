Songstorm.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "checkSignIn",
    "users/new": "userNew",
    "session/new": "signIn",
    "users/:id": "userShow",
    "users/:id/likes": "userFavorites",
    "playlists/new": "playlistNew",
    "playlists/:id": "playlistShow",
    "playlists/:id/edit": "playlistEdit",
    "songs/new": "songNew",
    "songs/:id": "songShow",
    "songs/:id/edit": "songEdit",
    "search": "search"
  },

  checkSignIn: function () {
    if (Songstorm.currentUser.isSignedIn()) {
      Backbone.history.navigate("users/"+Songstorm.currentUser.id, {trigger:true});
    } else {
      // Backbone.history.navigate("session/new", {trigger:true});
      this.signIn();
    }
  },

  search: function () {
    var searchView = new Songstorm.Views.Search();
    this._swapView(searchView);
  },

  userNew: function () {
    if (!this._requireSignedOut()) {return;}

    var model = new Songstorm.users.model();
    var formView = new  Songstorm.Views.UsersForm({
      collection: Songstorm.users,
      model: model
    });
    this._swapView(formView);
  },

  signIn: function (callback) {
    if (!this._requireSignedOut(callback)) {return;};

    var signView = new Songstorm.Views.SignIn({
      callback: callback
    });

    this._swapView(signView);
  },

  _requireSignedIn: function (callback) {
    if (!Songstorm.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }
    return true;
  },

  _requireSignedOut: function (callback) {
    if (Songstorm.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function () {
    alert("You need to be logged in to do that.");
    Backbone.history.navigate("session/new", {trigger: true});
  },

  userShow: function (id) {
    var that = this;

    var user = Songstorm.users.getOrFetch(id, function() {
    });
    var userShowView = new Songstorm.Views.UserShow({model: user});
    that._swapView(userShowView);

  },

  userFavorites: function (id) {
    var that = this;
    var user;
    var faves;
    var userFavView;
    Songstorm.users.fetch({
      success: function () {
        user = Songstorm.users.getOrFetch(id);
        faves = new Songstorm.Collections.Likes({user: user})
        faves.fetch({
          success: function () {
            console.log(faves.toJSON());
    userFavView = new Songstorm.Views.UserFavorites({collection: faves});
    that._swapView(userFavView);
          }
        });
      }
    });
  },

  playlistNew: function () {
    // var callback = this.playlistNew.bind(this);
    // if (!this._requireSignedIn(callback)) {return;}
    var newPlaylist = new Songstorm.Models.Playlist();

    var playlistFormView = new Songstorm.Views.PlaylistForm({
      collection: Songstorm.playlists,
      model: newPlaylist
    })

    this._swapView(playlistFormView);

  },

  playlistShow: function (id) {
    var that = this;
    var playlist = Songstorm.playlists.getOrFetch(id);
      var playlistShowView = new Songstorm.Views.PlaylistShow({ model: playlist });
      that._swapView(playlistShowView);
  },

  playlistEdit: function (id) {
    // var callback = this.playlistNew.bind(this, id);
    // if (!this._requireSignedIn(callback)) {return;}
    var playlist = Songstorm.playlists.getOrFetch(id);
    var playlistEditView = new Songstorm.Views.PlaylistForm({
      model: playlist,
      collection: Songstorm.playlists
    });
    this._swapView(playlistEditView);
  },

  songNew: function () {
    // var callback = this.playlistNew.bind(this);
    // if (!this._requireSignedIn(callback)) {return;}
    var newSong = new Songstorm.Models.Song();
    var songFormView = new Songstorm.Views.SongForm({
      model: newSong,
      collection: Songstorm.songs
    })

    this._swapView(songFormView)
  },

  songShow: function (id) {
    // var callback = this.playlistNew.bind(this, id);
    // if (!this._requireSignedIn(callback)) {return;}
    var song = Songstorm.songs.getOrFetch(id);
    Songstorm.playlists.fetch();
    var songShowView = new Songstorm.Views.SongShow({ model: song });
    this._swapView(songShowView);
  },

  songEdit: function (id) {
    // var callback = this.playlistNew.bind(this, id);
    // if (!this._requireSignedIn(callback)) {return;}
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

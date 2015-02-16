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
      this.userShow();
    } else {
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
    Backbone.history.navigate("", {trigger: true});
    // console.log("hello from go home");

  },

  userShow: function (id) {
    // var callback = this.userShow.bind(this, id);
    // if (!this._requiredSignedIn(callback)) {return;};
    if (!Songstorm.currentUser.isSignedIn()) {
      this._goHome();
      return ;
    };

    var that = this;

    var user = Songstorm.users.getOrFetch(id, function() {
      var userShowView = new Songstorm.Views.UserShow({model: user});
      that._swapView(userShowView);
    });
  },

  userFavorites: function (id) {
    var that = this;
    // if (!Songstorm.currentUser.isSignedIn()) {
    //   console.log('hey redirecting');
    //   this._goHome()
    //   return ;
    // }
    var user;
    var faves;
    var userFavView;
    Songstorm.users.fetch({
      success: function () {
        user = Songstorm.users.getOrFetch(id);
        // console.log('users fetched');
        faves = new Songstorm.Collections.Likes({user: user})
        // debugger
        faves.fetch({
          success: function () {
            console.log(faves.toJSON());
    userFavView = new Songstorm.Views.UserFavorites({collection: faves});
    that._swapView(userFavView);
          }
        });
        // console.log(faves);
      }
    });
    // debugger
    // console.log(Songstorm.likes); 
    // faves.fetch();

    // debugger
    // console.log(user);
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
    var that = this;
    var playlist = Songstorm.playlists.getOrFetch(id);
      var playlistShowView = new Songstorm.Views.PlaylistShow({ model: playlist });
      that._swapView(playlistShowView);
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
    Songstorm.playlists.fetch();
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

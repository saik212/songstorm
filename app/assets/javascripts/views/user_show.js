Songstorm.Views.UserShow = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(Songstorm.currentUser, 'change', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.songs(), 'sync remove add', this.render);
    this.listenTo(this.model.playlists(), 'sync remove add', this.render);
  },

  events: {
    "click .delete-playlist": "delete",
    "click .rmv-sg-btn": "delete",
    "click .fa-play": "playSong",
    "click .create-playlist": "createPlaylist"
  },

  
  render: function () {
    var currUserId = parseInt(Songstorm.currentUser.id);
    var userShowId = parseInt(this.model.id);
    var content = this.template({
      user: this.model,
      currUserId: currUserId,
      userShowId: userShowId
    });
    this.$el.html(content);
    this.renderPlaylists();
    this.renderSongs();

    return this;
  },

  renderPlaylists: function () {
    var container = $("#user-playlists");
    var template = JST["users/user_playlists"];
    var that = this;

    this.model.playlists().forEach(function (playlist) {
      container.append(template({playlist: playlist, userShow: that.model}));
    });
  },

  renderSongs: function () {
    var container = $("#user-songs");
    var template = JST["users/user_songs"];
    var that = this;

    this.model.songs().forEach(function (song) {
      container.append(template({song: song, userShow: that.model}));
    });
  },

  delete: function (event) {
    event.preventDefault();

    var target = $(event.target);
    var targetId = target.data('id');
    var targetCollection = target.data('collection');

    if (targetCollection === "playlists") {
      var model = this.model.playlists().get(targetId);
      Songstorm.playlists.remove(model);
      model.destroy();
    } else {
      var model = this.model.songs().get(targetId);
      Songstorm.songs.remove(model);
      model.destroy();
    }
  },

  playSong: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    var songId = $(event.currentTarget).data("song-id");
    Songstorm.playQueue.push(Songstorm.songs.getOrFetch(songId));
    Songstorm.globalPlayer.track = 0;
    Songstorm.globalPlayer.playQueue();
  },

  createPlaylist: function (event) {
    event.preventDefault();

    Songstorm.modal.showCreatePlaylist();
  }
})

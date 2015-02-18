Songstorm.Views.UserShow = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(Songstorm.currentUser, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.songs(), 'sync remove', this.render);
    this.listenTo(this.model.playlists(), 'sync remove', this.render);
  },

  events: {
    "click .delete-playlist": "delete",
    "click .delete-button": "delete",
    "click .fa-play": "playSong"
  },

  render: function () {
    console.log("HIHI");
    var currUserId = parseInt(Songstorm.currentUser.id);
    var userShowId = parseInt(this.model.id);
    var content = this.template({
      user: this.model,
      currUserId: currUserId,
      userShowId: userShowId
    });
    this.$el.html(content);

    return this;
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
    var player = $("#global-player audio");
    var songUrl = $(event.currentTarget).data("song-url");
    player.attr("src", songUrl);
    player = player[0];
    player.play();
  },
})

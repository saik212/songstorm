Songstorm.Views.PlaylistShow = Backbone.View.extend({
  template: JST["playlists/show"],

  initialize: function () {
    this.uploader = new Songstorm.Models.User();
    this.listenTo(this.model, 'sync', this.getUploader);
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.uploader, 'sync', this.render);
    this.listenTo(Songstorm.playlistSongs, 'add change remove', this.render);
    this.listenTo(this.model.songs(), 'add change remove', this.render);
  },

  events: {
    "click #play-queue": "playQueue",
  	"click .fa-play": "playSong",
    "click .remove-button": "removeSong"
  },

  render: function () {
    var currUserId = parseInt(Songstorm.currentUser.id);
    var uploader_id = parseInt(this.model.escape('user_id'));
    var content = this.template({
      playlist: this.model,
      uploader: this.uploader,
      currUserId: currUserId,
      uploader_id: uploader_id
    });
    this.$el.html(content);
    return this;
  },

  getUploader: function () {
    var that = this;
    this.uploader.set({id: parseInt(this.model.escape('user_id'))});
    this.uploader.fetch({
      success: function () {
        console.log(that.uploader);
        console.log(that.uploader.playlists());
      }
    });
  },

  playQueue: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    this.model.songs().forEach(function (song) {
      Songstorm.playQueue.push(song.escape('audio_url'));
    });

    console.log('playlist hihi');
    Songstorm.globalPlayer.playQueue();
  },

  playSong: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    var songUrl = $(event.currentTarget).data("song-url");
    Songstorm.playQueue.push(songUrl);
    Songstorm.globalPlayer.playQueue();
  },

  removeSong: function(event) {
    event.preventDefault();
    var that = this;
    var songId = $(event.target).data("song-id");
    var song = this.model.songs().get(songId);
    var playlistSong = Songstorm.playlistSongs.findWhere({"song_id":songId, "playlist_id":this.model.id});
    playlistSong.destroy({
      success: function () {
        that.model.songs().remove(song);
        song.playlists().remove(that.model);
      },
      error: function () {
        console.log("didn't remove song");
      }
    });
  }
})

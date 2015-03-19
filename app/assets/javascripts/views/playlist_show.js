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
    "click .remove-button": "removeSong",
    "click #delete-playlist": "deletePlaylist"
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
    this.renderSongs();
    this.renderSongPlaylists();
    return this;
  },

  renderSongs: function () {
    var container = $("#trk-listing");
    var template = JST["playlists/playlist_songs"];
    var that = this;

    if (this.model.songs().length > 0) {

      var trackNum = 1;
      this.model.songs().forEach(function (song) {
        container.append(template({song:song, playlist: that.model, trackNum: trackNum}));
        trackNum++;
      })

    } else {

      container.append("<li>No songs in this list!</li>");
    }

  },

  renderSongPlaylists: function () {
    var container = $(".in-plst");
    var template = JST["playlists/more_playlists"];
    var that = this;

    this.uploader.playlists().forEach(function (playlist) {
      if (that.model.escape("name") !== playlist.escape("name")) {
        container.append(template({playlist: playlist}));
      }
    });
  },

  getUploader: function () {
    var that = this;
    this.uploader.set({id: parseInt(this.model.escape('user_id'))});
    this.uploader.fetch({
      success: function () {
      }
    });
  },

  playQueue: function (event) {
    event.preventDefault();
    console.log("Trying to play queue");
    Songstorm.playQueue = [];
    this.model.songs().forEach(function (song) {
      Songstorm.playQueue.push(song);
    });

    Songstorm.globalPlayer.track = 0;
    Songstorm.globalPlayer.playQueue();
  },

  playSong: function (event) {
    event.preventDefault();
    if (event.target.id === "play-queue") {return;}

    Songstorm.globalPlayer.track = 0;
    Songstorm.playQueue = [];
    var songId = $(event.currentTarget).data("song-id");
    Songstorm.playQueue.push(Songstorm.songs.getOrFetch(songId));
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
  },

  deletePlaylist: function(event) {
    event.preventDefault();
    var that = this;
    Songstorm.playlists.remove(that.model);
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", {trigger:true});
      },
      error: function () {
        alert("didn't work");
      }
    })
  }
})

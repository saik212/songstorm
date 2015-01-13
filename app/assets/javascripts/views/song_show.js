Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync add change remove', this.render);
    this.listenTo(Songstorm.playlistSongs, 'add change remove', this.render);
  },

  events: {
    "click .add_playlist": "addPlaylist",
    "click .remove_playlist": "removePlaylist"
  },


  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  },

  addPlaylist: function (event) {
    event.preventDefault();
    var that = this;

    var optionId = $("#playlist_song_playlist_id").val();
    var playlist = Songstorm.playlists.get(optionId);
    var playlistSong = new Songstorm.Models.PlaylistSong({song_id: this.model.id, playlist_id: optionId});
    playlistSong.save({}, {
      success: function (model) {
        that.model.playlists().add(playlist);
        Songstorm.playlistSongs.add(playlistSong);
      }
    })
  },

  removePlaylist: function (event) {
    event.preventDefault();
    var that = this;

    var optionId = $(event.target).data("id");
    var playlist = this.model.playlists().get(optionId);
    var playlistSong = Songstorm.playlistSongs.findWhere({"song_id":this.model.id, "playlist_id":optionId});

    playlistSong.destroy({
        success: function () {
          that.model.playlists().remove(playlist);
        }
    });
  }
})

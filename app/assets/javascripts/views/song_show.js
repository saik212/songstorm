Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync add change', this.render);
    this.listenTo(this.model.playlistSongs(), 'add change', this.render);
  },

  events: {
    "click .add_playlist": "addPlaylist"
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
        that.model.playlistSongs().add(playlistSong);
      }
    })
    // debugger
    // this.model.set(this.model._playlists);
    // console.log('stuff1');
    // this.model.save({playlists: playlist}, {
    //   success: function (req, resp) {
    //     that.model._playlists.add(playlist);
    //     console.log('success');
    //   },
    //   error: function (req, resp) {
    //     console.log("failure");
    //   }
    // });
    // console.log('stuff2');
  }
})

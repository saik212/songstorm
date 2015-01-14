Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync add change remove', this.render);
    this.listenTo(this.model.comments(), 'sync add change remove', this.render);
    this.listenTo(Songstorm.playlistSongs, 'add change remove', this.render);
  },

  events: {
    "click .add_playlist": "addPlaylist",
    "click .remove_playlist": "removePlaylist",
    "click .add_comment": "addComment",
    "click .delete_comment": "deleteComment"
  },


  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  },

  addComment: function (event) {
    event.preventDefault();
    var that = this;
    commSongId = parseInt($(".song_id").val());
    commBody = $(".comment_body").val();
    currUser = Songstorm.users.findWhere({
      "is_current_user":true
    });
    commUserId = currUser.id;

    comment = new Songstorm.Models.Comment({
      user_id: commUserId,
      commentable_id: this.model.id,
      commentable_type: 'Song',
      body: commBody,
      author: currUser.escape("username")
    });

    comment.save({}, {
      success: function () {
        console.log("in success");
        that.model.comments().add(comment);
        Songstorm.comments.add(comment);
        // debugger
        //currentUser.comments.add(comment);
      }
    });
  },

  deleteComment: function (event) {
    event.preventDefault();
    var that = this;
    commId = $(event.target).data('id');
    comment = Songstorm.comments.get(commId);

    comment.destroy({
      success: function () {
        console.log('in comment destroy')
        that.model.comments().remove(comment);
      }
    })
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
    });
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
});

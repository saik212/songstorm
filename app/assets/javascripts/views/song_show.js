Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    // Songstorm.users.fetch();
    // Songstorm.likes.fetch();
    Songstorm.currentUser.fetch();
    // console.log(Songstorm.users.getOrFetch(Songstorm.currentUser.id));
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync add change remove', this.render);
    this.listenTo(this.model.comments(), 'sync add change remove', this.render);
    this.listenTo(Songstorm.playlistSongs, 'add change remove', this.render);
  },

  events: {
    "click #add-playlist": "addPlaylist",
    "click .remove_playlist": "removePlaylist",
    "click .add_comment": "addComment",
    "click .delete_comment": "deleteComment",
    "click .add-like": "addLike",
    "click .remove-like": "removeLike",
    "click .fa-play": "playSong"
  },
  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  },

  playSong: function (event) {
    event.preventDefault();
    var player = $("#global-player audio");
    // console.log(this.model.escape("audio_url"));
    player.attr("src", this.model.escape("audio_url"));
    player = player[0];
    player.play();
    // console.log(player);
  },

  addComment: function (event) {
    event.preventDefault();
    var that = this;
    commSongId = parseInt($(".song_id").val());
    commBody = $(".comment_body").val();
    // currUser = Songstorm.users.findWhere({
    //   "is_current_user":true
    // });
    // commUserId = Songstorm.currentUser.id;

    comment = new Songstorm.Models.Comment({
      user_id: Songstorm.currentUser.id,
      commentable_id: this.model.id,
      commentable_type: 'Song',
      body: commBody,
      author: Songstorm.currentUser .escape("username")
    });

    comment.save({}, {
      success: function () {
        // console.log("in success");
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
    comment = this.model.comments().get(commId);
    comment.destroy({
      success: function () {
        that.model.comments().remove(comment);
      }
    })
  },

  addLike: function (event) {
    event.preventDefault();
    var that = this;

    var song_id = this.model.id;
    var user_id = Songstorm.currentUser.id;

    var like = new Songstorm.Models.Like({song_id: song_id, user_id: user_id, song: this.model});
    // debugger
    like.save({}, {
      success: function () {

        console.log('saved like');
      },
      error: function () {
        console.log("didn't save like");
      }
    });
  },

  removeLike: function (event) {
    event.preventDefault();
    var that = this;
    var song_id = this.model.id;
    var user_id = Songstorm.currentUser.id;
    var user = Songstorm.users.getOrFetch(user_id);
    var like;
    // debugger
    // like.destroy();
    Songstorm.likes.fetch({
      success: function () {
        like = Songstorm.likes.findWhere({user_id: user_id, song_id: song_id});
        like.destroy({
          success: function () {
            user.likedSongs().fetch({
              success: function () {
                console.log(like);
                // console.log(user.likedSongs());
                user.likedSongs().remove(like);
                // console.log(user.likedSongs());
                
              }
            });
          }
        })
      }
    })

    
  },

  addPlaylist: function (event) {
    event.preventDefault();
    var that = this;

    var optionId = $("#playlist-song-playlist-id").val();
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

Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync add change remove', this.render);
    this.listenTo(this.model.comments(), 'sync add change remove', this.render);
    this.listenTo(Songstorm.playlistSongs, 'add change remove', this.render);
    this.listenTo(Songstorm.playlists, 'sync', this.render);
    this.listenTo(Songstorm.likes, 'add sync remove', this.render);
  },

  events: {
    "click #add-playlist": "addPlaylist",
    "click .remove_playlist": "removePlaylist",
    "click .comment-submit": "addComment",
    "click .delete-comment": "deleteComment",
    "click .add-like": "addLike",
    "click .remove-like": "removeLike",
    "click .fa-play": "playSong",
    "click #delete-song": "deleteSong",
    "click #add-playlist-form": "playlistForm"
  },

  render: function () {
    var currUserId = parseInt(Songstorm.currentUser.id);
    var uploader_id = parseInt(this.model.escape('uploader_id'));
    var content = this.template({
      song: this.model,
      currUserId: currUserId,
      uploader_id: uploader_id
    });
    this.$el.html(content);
    this.renderInfo();

    return this;
  },

  renderInfo: function () {
    this.renderComments();
    this.renderPlaylists();
    return;
    // this.renderSongInfo();
    this.renderPlaylistForm();
  },

  renderSongInfo: function () {
    var container = $(".song-info")
    var template = JST["songs/song_info"];
    var uploader_id = parseInt(this.model.escape('uploader_id'));

    container.append(template({
      song: this.model,
      uploader_id: uploader_id
    }))    
  },

  renderPlaylists: function () {
    var container = $(".in-plst");
    var template = JST["playlists/list_item"];

    this.model.playlists().forEach(function (playlist) {
      container.append(template({playlist: playlist}));
    })
  },

  renderPlaylistForm: function () {
    if (Songstorm.currentUser.isSignedIn()) {
      Songstorm.playlists.forEach(function (playlist) {
        $("#playlist-song-playlist-id").append("<option value="+playlist.id+">"+playlist.escape('name')+"</option>");
      });
    } else {
      $("#playlist-song-form").css("display", "none");
    }
  },

  renderComments: function () {
    if (!Songstorm.currentUser.isSignedIn()) {
      $(".comments-form").css("display", "none");
    }

    var container = $(".cmts-display");
    var template = JST["songs/comment_li"];
    if (this.model.comments().length > 0) {
      this.model.comments().forEach(function (comment) {
        container.append(template({comment: comment}));
      })
    } else {
      container.css("display", "none");
    }
  },

  playSong: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    Songstorm.playQueue.push(this.model);
    Songstorm.globalPlayer.track = 0;
    Songstorm.globalPlayer.playQueue();
  },

  addComment: function (event) {
    event.preventDefault();
    var that = this;
    commSongId = parseInt($(".song_id").val());
    commBody = $(".comment_body").val();

    comment = new Songstorm.Models.Comment({
      user_id: Songstorm.currentUser.id,
      commentable_id: this.model.id,
      commentable_type: 'Song',
      body: commBody,
      author: Songstorm.currentUser.escape("username"),
      author_image: Songstorm.currentUser.escape("image_url")
    });

    comment.save({}, {
      success: function () {
        that.model.comments().add(comment);

        Songstorm.comments.add(comment);
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
        Songstorm.comments.remove(comment);
      }
    })
  },

  addLike: function (event) {
    event.preventDefault();
    this.render();
    var that = this;

    var song_id = this.model.id;
    var user_id = Songstorm.currentUser.id;

    var like = new Songstorm.Models.Like({song_id: song_id, user_id: user_id, song: this.model});
    like.save({}, {
      success: function () {
        Songstorm.likes.add(like);

        that.model.fetch();
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
    like = Songstorm.likes.findWhere({user_id: user_id, song_id: song_id});
    like.destroy({
      success: function () {
        that.model.fetch();
        Songstorm.likes.remove(like);
        user.likedSongs().fetch({
          success: function () {
            user.likedSongs().remove(like);
          }
        });
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
        console.log(playlist);
        that.model.playlists().add(playlist);
        Songstorm.playlistSongs.add(playlistSong);
      }
    });
  },

  deleteSong: function (event) {
    event.preventDefault();
    var that = this;

    Songstorm.songs.remove(this.model);
    this.model.destroy({
      success: function () {
        Backbone.history.navigate("", {trigger: true});
      }, 
      error: function () {
        alert("Didn't work");
      }
    });
  },

  playlistForm: function (event) {
    event.preventDefault();

    Songstorm.modal.showAddPlaylist();
  }

});

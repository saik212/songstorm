Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.playlists(), 'sync', this.render)
  },

  events: {
    "click .add_playlist": "addPlaylist"
  },


  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  },

  // addPlaylist: function (event) {
  //   event.preventDefault();

  //   var selectId = $("#playlist_song_playlist_id").val();
  // }
})

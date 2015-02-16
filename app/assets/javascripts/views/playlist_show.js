Songstorm.Views.PlaylistShow = Backbone.View.extend({
  template: JST["playlists/show"],

  initialize: function () {
    this.uploader = new Songstorm.Models.User();
    // this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.getUploader);
    this.listenTo(this.uploader, 'sync', this.render);
  },

  events: {
  	"click .fa-play": "playSong"
  },


  render: function () {
    var content = this.template({playlist: this.model, uploader: this.uploader});
    this.$el.html(content);
    return this;
  },

  getUploader: function () {
    var that = this;
    this.uploader.set({id: this.model.toJSON().user_id});
    this.uploader.fetch();
  },

  playSong: function (event) {
    event.preventDefault();
    var player = $("#global-player audio");
    var songId = $(event.currentTarget).data("song");
    var song = Songstorm.songs.getOrFetch(songId);
    // debugger
    // console.log(this.model.escape("audio_url"));
    player.attr("src", song.escape("audio_url"));
    player = player[0];
    player.play();
    // console.log(player);
  },
})

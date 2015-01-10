Songstorm.Views.PlaylistShow = Backbone.View.extend({
  template: JST["playlists/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },

  render: function () {
    var content = this.template({playlist: this.model});
    this.$el.html(content);
    return this;
  }
})

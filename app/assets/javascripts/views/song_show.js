Songstorm.Views.SongShow = Backbone.View.extend({
  template: JST["songs/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  }
})

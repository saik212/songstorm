Songstorm.Views.UserShow = Backbone.View.extend({
  template: JST["users/show"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.songs(), 'sync remove', this.render);
    this.listenTo(this.model.playlists(), 'sync remove', this.render);
  },

  events: {
    "click .delete": "delete", 
  },

  render: function () {
    var content = this.template({user: this.model});
    this.$el.html(content);
    return this;
  },

  delete: function (event) {
    event.preventDefault();

    var target = $(event.target);
    var targetId = target.data('id');
    var targetCollection = target.data('collection');

    if (targetCollection === "playlists") {
      var model = Songstorm.playlists.getOrFetch(targetId);
      Songstorm.playlists.remove(targetId);
    } else {
      var model = Songstorm.songs.getOrFetch(targetId);
      Songstorm.songs.remove(targetId);
    }
    model.destroy();
  }
})

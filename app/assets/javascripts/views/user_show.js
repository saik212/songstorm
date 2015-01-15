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

  className: "profile_box group",

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
      var model = this.model.playlists().get(targetId);
      // Songstorm.playlists.remove(targetId);
      Songstorm.playlists.remove(model);
      model.destroy();
    } else {
      var model = this.model.songs().get(targetId);
      Songstorm.songs.remove(model);
      model.destroy();
      // Songstorm.songs.remove(targetId);
    }
  }
})

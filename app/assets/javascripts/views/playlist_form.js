Songstorm.Views.PlaylistForm = Backbone.View.extend({
  tagName: 'form',

  template: JST["playlists/form"],

  events: {
    "click .submit_form": "submit"
  },

  render: function () {
    var content = this.template({playlist: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var dataInfo = this.$el.serializeJSON();
    var that = this;
    this.model.save(dataInfo, {
      success: function () {
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("playlists/"+that.model.get("id"), {trigger: true});
      }
    })
  }
})

Songstorm.Views.SongForm = Backbone.View.extend({
  tagName: 'form',

  template: JST["songs/form"],

  initialize: function () {
  },

  events: {
    "click .submit_form": "submit"
  },

  render: function () {
    var content = this.template({song: this.model});
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
        Backbone.history.navigate("songs/"+that.model.id, {trigger: true});
      },
      error: function () {
      }
    })
  }
})

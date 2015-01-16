Songstorm.Views.SongForm = Backbone.View.extend({
  tagName: 'form',
  className: 'users-form',

  attributes: {
    "enctype": "multipart/form-data"
  },

  template: JST["songs/form"],

  initialize: function () {
  },

  events: {
    "click .submit_form": "submit",
    "change #add_audio_file": "fileInputChange"
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
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      that.model._audio = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete this.model._audio;
    }
  },
})

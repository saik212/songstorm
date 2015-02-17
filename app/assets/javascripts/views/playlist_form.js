Songstorm.Views.PlaylistForm = Backbone.View.extend({
  tagName: 'form',
  className: 'users-form',

  attributes: {
    "enctype": "multipart/form-data"
  },


  template: JST["playlists/form"],

  events: {
    "click .submit_form": "submit",
    "change #input-post-image": "fileInputChange"
  },

  render: function () {
    var content = this.template({playlist: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var dataInfo = this.$el.serializeJSON().playlist;
    console.log(dataInfo);
    var that = this;
    this.model.save(dataInfo, {
      success: function () {
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("playlists/"+that.model.id, {trigger: true});
      }
    })
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
      console.log(reader.result)
      that.model._image = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete this.model._image;
    }
  },
})

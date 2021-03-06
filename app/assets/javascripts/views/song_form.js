Songstorm.Views.SongForm = Backbone.View.extend({
  tagName: 'form',
  className: 'user-songs',
  id: 'song-form',

  attributes: {
    "enctype": "multipart/form-data"
  },

  template: JST["songs/form"],

  initialize: function () {
  },

  events: {
    "click .submit_form": "submit",
    "change #add_audio_file": "audioFileInputChange",
    "change #input-post-image": "imageFileInputChange"
  },

  render: function () {
    var content = this.template({song: this.model});
    this.$el.html(content);
    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var dataInfo = this.$el.serializeJSON();
    console.log(dataInfo);
    var that = this;
    this.model.save(dataInfo, {
      success: function () {
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("songs/"+that.model.id, {trigger: true});
      },
      error: function () {
        alert("Invalid form data: Must have song title and song file");
        $(".spinner").remove();
      }
    });
    $(".user-songs").append("<img class='spinner' src='https://s3.amazonaws.com/songstorm-pics/seeds/spinner.gif'>");
  },

  audioFileInputChange: function(event){
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

  imageFileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    console.log(file);
    var reader = new FileReader();
    reader.onloadend = function(){
      that.model._image = reader.result;
    }
    if (file) {
      reader.readAsDataURL(file);
    } else {
      delete this.model._image;
    }
  },
})

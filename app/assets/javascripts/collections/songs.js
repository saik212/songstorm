Songstorm.Collections.Songs = Backbone.Collection.extend({
  url:"api/songs",

  getOrFetch: function (id) {
    var song = this.get(id);
    var songs = this;

    if (song) {
      song.fetch()
    } else {
      song = new Songstorm.Models.Song({ id: id })
      song.fetch({
        success: function () {
          songs.add(song);
        }
      });
    }
    return song;
  }
})

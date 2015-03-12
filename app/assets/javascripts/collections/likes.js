Songstorm.Collections.Likes = Backbone.Collection.extend({
	url: function () {
		if (this.user) {
			return "api/users/"+this.user.id+"/likes";		
		} else {
			return "api/likes";
		}
	},
	initialize: function (options) {
    if (options){
      this.url = options.url || this.url;
      this.user = options.user;
    }
  },
	model: Songstorm.Models.Like,

	getOrFetch: function (id) {
    var like = this.get(id);
    var likes = this;

    if (like) {
      like.fetch()
    } else {
      like = new Songstorm.Models.Like({ id: id })
      like.fetch({
        success: function () {
          like.add(like);
        }
      });
    }
    return like;
  }
})
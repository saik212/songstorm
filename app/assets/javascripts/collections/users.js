Songstorm.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Songstorm.Models.User,

  getOrFetch: function (id, callback) {
    var user = this.get(id);
    var users = this;

    if (user) {
      user.fetch({
        success: function () {
          if (callback){
            callback();
          }
        }
      })
    } else {
      user = new Songstorm.Models.User({ id: id })
      user.fetch({
        success: function () {
          users.add(user);
        }
      });
    }
    return user;
  }
})

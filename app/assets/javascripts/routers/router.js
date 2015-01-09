Songstorm.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    "": "main",
    "users/:id": "userShow"
  },

  userShow: function (id) {
    var user = Songstorm.users.getOrFetch(id);
    var showView = new Songstorm.Views.UserShow({model: user});
    this.$rootEl.html(showView.render().$el);
  }

})

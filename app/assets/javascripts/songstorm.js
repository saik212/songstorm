window.Songstorm = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Songstorm.users = new Songstorm.Collections.Users();
    Songstorm.users.fetch();
    new Songstorm.Routers.Router({
      $rootEl: $("#content")
    });
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Songstorm.initialize();
});

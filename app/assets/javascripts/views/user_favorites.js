Songstorm.Views.UserFavorites = Backbone.View.extend({
	template: JST["users/favorites"],

	initialize: function () {
		this.listenTo(this.collection, 'sync', this.render);
	},

	events: {
		"mouseover .img-item": "showSongModal",
		"mouseleave .img-item": "hideSongModal",
    "click .fa-play": "playSong",
	},

	render: function () {
		var content = this.template({likes: this.collection});
		this.$el.html(content);
		this.renderLikes();
		return this;
	},

	renderLikes: function () {
		var container = $("#user-likes");
		var that = this;

		this.collection.forEach(function (like) {
			var template = JST["users/like"];

			container.append(template({like: like}));
		});

	},

	showSongModal: function (event) {
		event.preventDefault();

		$(event.target).children(".song-modal").fadeIn(150);
	},

	hideSongModal: function (event) {
		event.preventDefault();

		$(".song-modal").fadeOut(150);
	},


	playSong: function (event) {
		event.preventDefault();
    if (event.target.id === "play-queue") {return;}

    Songstorm.globalPlayer.track = 0;
    Songstorm.playQueue = [];
    var songId = $(event.currentTarget).data("song-id");
    Songstorm.playQueue.push(Songstorm.songs.getOrFetch(songId));
    Songstorm.globalPlayer.playQueue();
	},

})
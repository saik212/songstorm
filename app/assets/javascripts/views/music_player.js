Songstorm.Views.MusicPlayer = Backbone.View.extend({
	template: JST["shared/player"],

	initialize: function (options) {
		this.render();
	},

	events: {
		"click .fa-play": "playSong"
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	},

	playSong: function (event) {
		event.preventDefault();

		var songId = $(event.target).data("song");
		var song = Songstorm.song.getOrFetch(songId);
		var songUrl = song.get("audio_url");
		console.log(songId);
	}

})
Songstorm.Views.MusicPlayer = Backbone.View.extend({
	template: JST["shared/player"],

	initialize: function (options) {
		this.rootEl	= options.rootEl;
		this.$rootEl = $(options.rootEl);
		// debugger
		this.render();
	},

	playQueue: function () {
		console.log("GLOBAL PLAYER HIHI");
		console.log(Songstorm.playQueue);
		// grab video player
		// play first song
		// set counter variable
		// on end of playing song, increment counter, and reset player src url
		var track = 1;
		var player = $("#global-player audio");
		player.attr('src', Songstorm.playQueue[0]);
		console.log(player[0]);

		player[0].play();

		player.on("ended", function(){
			var nextTrack = Songstorm.playQueue[track];
			console.log("PLAYER EVENT HIHI");
			console.log(track);
			console.log(nextTrack);
			if (track >= Songstorm.playQueue.length) {return;}
			track++;
			player.attr("src", nextTrack);
			player[0].play();
		});

	},


	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})
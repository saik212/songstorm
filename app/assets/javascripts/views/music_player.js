Songstorm.Views.MusicPlayer = Backbone.View.extend({
	template: JST["shared/player"],

	initialize: function (options) {
		this.rootEl	= options.rootEl;
		this.$rootEl = $(options.rootEl);
		// debugger
		this.render();

		this.$player = $("#global-player audio");
		this.track = 0;
	},

	events: {
		"click #next-song": "playNext",
		"click #previous-song": "playPrevious"
	},

	playQueue: function () {
		var that = this;
		// var track = 1;
		$(".stopped").removeClass("stopped");
		// var player = $("#global-player audio");
		this.$player.attr('src', Songstorm.playQueue[this.track].escape('audio_url'));
		$(".current-song").text(Songstorm.playQueue[this.track].escape('title'));
		this.$player[0].play();

		this.$player.on("ended", function(){
			var nextTrack = Songstorm.playQueue[that.track+1];
			$(".current-song").text(nextTrack.escape('title'));
			if (that.track >= Songstorm.playQueue.length) {return;}
			that.track++;
			that.$player.attr("src", nextTrack.escape('audio_url'));
			that.$player[0].play();
		});

	},

	playNext: function (event) {
		event.preventDefault();

		if (Songstorm.playQueue[this.track+1]) {
			this.track = (1 + this.track);
		} else {
			this.track = 0;
		}
		this.playQueue();
	},

	playPrevious: function (event) {
		event.preventDefault();

		if (this.track === 0) {
			this.track = Songstorm.playQueue.length-1;
		} else {
			this.track--;
		}

		this.playQueue();
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})
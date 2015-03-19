Songstorm.Views.Search = Backbone.View.extend({
	initialize: function () {
		this.searchResults = new Songstorm.Collections.SearchResults();
		this.listenTo(this.searchResults, "sync", this.render);
		this.listenTo(Songstorm.songs, 'sync', this.render);
	},

	events: {
		"click #search-btn": "search",
		"click .next-page": "nextPage",
		"click .fa-play": "playSong"
	},

	// className: "search",
	template: JST["shared/search"],

	render: function () {
		var content = this.template ({
			collection: this.searchResults,
			searchQuery: $("#query").val()
		});
		this.$el.html(content);
		this.renderSearchResults();
		return this;
	},

	renderSearchResults: function () {
		var container = this.$("#search-results");

		this.searchResults.each(function (model) {
			var template;
			if (model.constructor === Songstorm.Models.Song) {
				template = JST["songs/list_item"]
			} else {
				console.log("model was not a song!!??!");
			}

			container.append(template({model: model}));
		});
	},

	search: function (event) {
		event.preventDefault();
		$('#search-results').removeClass("closed");

		var that = this;

		this.searchResults._query = this.$("#query").val();
		this.searchResults.fetch({
			data: {query: that.searchResults._query},
			success: function () {
				console.log(that.searchResults.length);
			},
		});
	},

	nextPage: function (event) {
		this.searchResults.fetch({
			data: {
				query: this.searchResults._query,
				page: (this.searchResults._page || 1) +1
			}
		});
	},

	playSong: function (event) {
    event.preventDefault();

    Songstorm.playQueue = [];
    var songId = $(event.currentTarget).data("song-id");
    Songstorm.playQueue.push(Songstorm.songs.getOrFetch(songId));
    Songstorm.globalPlayer.track = 0;
    Songstorm.globalPlayer.playQueue();
  },

});
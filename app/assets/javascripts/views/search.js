Songstorm.Views.Search = Backbone.View.extend({
	initialize: function () {
		this.searchResults = new Songstorm.Collections.SearchResults();
		this.listenTo(this.searchResults, "sync", this.render);
	},

	events: {
		"click .search": "search",
		"click .next-page": "nextPage"
	},

	template: JST["shared/search"],

	render: function () {
		console.log(this.searchResults);
		var content = this.template ({
			collection: this.searchResults
		});
		this.$el.html(content);
		this.renderSearchResults();
		return this;
	},

	renderSearchResults: function () {
		var container = this.$(".search-results");

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

		var that = this;
		console.log("in search");

		this.searchResults._query = this.$(".query").val();
		console.log(this);
		console.log(this.searchResults._query);
		this.searchResults.fetch({
			data: {query: this.searchResults._query},
			
		});
	},

	nextPage: function (event) {
		this.searchResults.fetch({
			data: {
				query: this.searchResults._query,
				page: (this.searchResults._page || 1) +1
			}
		});
	}

});
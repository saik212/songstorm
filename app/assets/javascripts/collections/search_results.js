Songstorm.Collections.SearchResults = Backbone.Collection.extend({
	url: "api/search",

	model: function (attrs) {
		var type = attrs._type;
		delete attrs._type;

		if (type === "Song") {
			return new Songstorm.Models.Song(attrs);
		} else {
			console.log("didn't return song");
			return ;
		}
	},

	parse: function (resp) {
		this._page = resp._page;

		return resp.results;
	}
})
Songstorm.Collections.Comments = Backbone.Collection.extend({
	url: "api/comments",

	comparator: function (comment) {
		return comment.id;
	}
});

Songstorm.Views.MusicPlayer = Backbone.View.extend({
	template: JST["shared/player"],

	initialize: function (options) {
		this.rootEl	= options.rootEl;
		this.$rootEl = $(options.rootEl);
		// debugger
		this.render();
	},

	render: function () {
		var content = this.template();
		this.$el.html(content);
		return this;
	}
})
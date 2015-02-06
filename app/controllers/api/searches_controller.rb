class Api::SearchesController < ApplicationController

	def index
		@search_results = Song.search_by_all(params[:query])

		render :index
	end

end
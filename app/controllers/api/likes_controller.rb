class Api::LikesController < ApplicationController
	def new
		@like = Like.new
		render :new
	end

	def index
		@likes = Like.all
		render :index
	end

	def destroy
		like = Like.find([params[:id]])
		like.destroy
		render json: like
	end

	private
	def like_params
		params.require(:like).permit(:song, :user)
	end
end

class Api::LikesController < ApplicationController

	def index
		@likes = params[:user_id] ? Like.where(user_id: params[:user_id]) : Like.all
		render :index
	end

	def create
		@like = Like.new(like_params)

		if @like.save
			render json: @like
		else
			render json: @like.errors.full_messages, status: 422
		end
	end

	def destroy
		like = Like.find(params[:id])
		like.destroy
		render json: like
	end

	private
	def like_params
		params.require(:like).permit(:song_id, :user_id, :song)
	end
	
end

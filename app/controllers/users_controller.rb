# class UsersController < ApplicationController
#   skip_before_action :require_signed_in!, only: [:new, :create]

#   wrap_parameters :user, include: [:password, :username, :image]
#   def new
#     @user = User.new
#   end

#   def create
#     @user = User.new(user_params)
#     if @user.save
#       sign_in(@user)
#       # render json: "welcome new dood"
#       redirect_to "/#/users/#{@user.id}"
#     else
#       flash.now[:errors] = @user.errors.full_messages
#       render :new
#     end
#   end

#   def show
#     @user = User.find(params[:id])
#     # @playlists = @user.playlists
#     render :show
#   end

#   private
#   def user_params
#     params.require(:user).permit(:password, :username, :image)
#   end
# end

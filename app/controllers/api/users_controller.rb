class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.includes(:songs, :playlists, :liked_songs).find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if  @user.save
      sign_in(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :image, :image_url)
  end
  
end

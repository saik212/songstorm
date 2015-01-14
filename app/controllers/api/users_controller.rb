class Api::UsersController < ApplicationController
  skip_before_action :require_signed_in!, only: [:new, :create]

  # wrap_parameters :user, include: [:username, :password, :image]
  # def new
  #   @user = User.new
  # end

  # def create
  #   @user = User.new(user_params)
  #   if @user.save
  #     sign_in(@user)
  #     # render json: "welcome new dood"
  #     redirect_to "/api/users/#{@user.id}"
  #   else
  #     flash.now[:errors] = @user.errors.full_messages
  #     render :new
  #   end
  # end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.includes(:songs, :playlists).find(params[:id])
    # @songs = @user.songs
    # @playlists = @user.playlists
    render :show
  end

  private
  def user_params
    params.require(:user).permit(:password, :username, :image)
  end
end

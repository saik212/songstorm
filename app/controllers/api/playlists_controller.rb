class Api::PlaylistsController < ApplicationController
  before_action :prevent_delete, only: [:destroy, :edit, :update]
  def new
    @playlist = Playlist.new
    render :new
  end

  def index
    # @playlists = params[:user_id] ? Playlist.where(user_id: params[:user_id]) : Playlist.all
    @playlists = current_user.playlists

    render :index
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)
    @playlist.user_id = current_user.id
    if @playlist.save
      render json: @playlist
    else
      render json: @playlists.errors.full_messages
    end
  end

  def show
    @playlist = Playlist.includes(:songs).find(params[:id])
    render :show
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render json: @playlist
    #redirect_to "/#/users/#{current_user.id}"
    # redirect_to user_url(current_user)
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update_attributes(playlist_params)
      render json: @playlist
      # redirect_to playlist_url(@playlist)
    else
      # flash.now[:errors] = @playlist.errors.full_messages
      render json: @playlist.errors.full_messages
    end
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name, :image, :image_url)
  end

  def prevent_delete
    playlist = Playlist.find(params[:id])
    if current_user.id != playlist.user_id
      redirect_to "/#/users/#{playlist.user_id}"
      # redirect_to user_url(User.find(playlist.user_id))
      # flash[:errors] = ["You can't do that"]
    end
  end
end

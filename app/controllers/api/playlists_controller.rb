class Api::PlaylistsController < ApplicationController

  def index
    if current_user
      @playlists = current_user.playlists
    else
      @playlists = Playlist.all
    end

    render :index
  end

  def create
    @playlist = current_user.playlists.new(playlist_params)
    @playlist.user_id = current_user.id
    if @playlist.save
      render :show
    else
      render json: @playlists.errors.full_messages, status: 422
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
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update_attributes(playlist_params)
      render json: @playlist
    else
      render json: @playlist.errors.full_messages, status: 422
    end
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name, :image)
  end

end

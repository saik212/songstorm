class Api::SongsController < ApplicationController
  
  def index
    @songs = params[:user_id] ? Song.where(uploader_id: params[:user_id]) : Song.all
    render :index
  end

  def create
    @song = current_user.songs.new(song_params)
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  def show
    @song = Song.includes(comments: :user).find(params[:id])
    render :show
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
    render json: song
  end

  def update
    @song = Song.find(params[:id])
    if @song.update_attributes(song_params)
      render :show
    else
      render json: @song.errors.full_messages, status: 422
    end
  end

  private
  def song_params
    params.require(:song).permit(:title, :artist, :album, :playlists, :audio, :audio_url, :image, :image_url)
  end

end

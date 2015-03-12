class Api::PlaylistSongsController < ApplicationController

  def index
    @playlist_songs = PlaylistSong.all
    render json: @playlist_songs
  end

  def create
    @playlist_song = PlaylistSong.new(playlist_song_params)

    if @playlist_song.save
      render json: @playlist_song
    else
      render json: @playlist_song.errors.full_messages, status: 422
    end
  end

  def destroy
    playlist_song = PlaylistSong.find(params[:id])
    playlist_song.destroy
    render json: playlist_song
  end

  private
  def playlist_song_params
    params.require(:playlist_song).permit(:song_id, :playlist_id)
  end
end

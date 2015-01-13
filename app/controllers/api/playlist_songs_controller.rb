class Api::PlaylistSongsController < ApplicationController
  def new
    @playlist_song = PlaylistSong.new
  end

  def index
    @playlist_songs = PlaylistSong.all
    render json: @playlist_songs
  end

  def show
    @playlist_song = PlaylistSong.find(params[:id])
  end

  def create
    @playlist_song = PlaylistSong.new(playlist_song_params)

    if @playlist_song.save
      # playlist = Playlist.find(@playlist_song.playlist_id)
      # redirect_to playlist_url(playlist)
      render json: @playlist_song
    else
      flash.now[:errors] = @playlist_song.errors.full_messages
      render json: flash[:errors]
    end
  end

  def destroy
    playlist_song = PlaylistSong.find(params[:id])
    playlist_song.destroy
    # redirect_to playlist_url(Playlist.find(playlist_song.playlist_id))
    render json: playlist_song
  end

  private
  def playlist_song_params
    params.require(:playlist_song).permit(:song_id, :playlist_id)
  end
end

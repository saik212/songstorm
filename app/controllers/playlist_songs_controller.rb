class PlaylistSongsController < ApplicationController
  def new
    @playlist_song = PlaylistSong.new
  end

  def create
    @playlist_song = PlaylistSong.new(playlist_song_params)

    if @playlist_song.save
      playlist = Playlist.find(@playlist_song.playlist_id)
      redirect_to playlist_url(playlist)
    else
      flash.now[:errors] = @playlist_song.errors.full_messages
      render json: flash[:errors]
    end
  end

  private
  def playlist_song_params
    params.require(:playlist_song).permit(:song_id, :playlist_id)
  end
end

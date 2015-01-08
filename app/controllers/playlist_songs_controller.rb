class PlaylistSongsController < ApplicationController
  def new
    @playlist_song = PlaylistSong.new
  end

  def create
    @playlist_song = PlaylistSong.new

    if @playlist_song.save
      playlist = Playlist.find(@playlist_song.playlist_id)
      redirect_to playlist_url(playlist)
    else
      flash.now[:errors] = @playlist_song.errors.full_messages
      render: new
    end
  end
end

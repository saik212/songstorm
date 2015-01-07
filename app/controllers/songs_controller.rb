class SongsController < ApplicationController
  def new
    @song = Song.new
  end

  def create
    @song = Song.new(song_params)
    @song.uploader_id = current_user.id

    if @song.save
      redirect_to user_song_url(current_user, @song)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render :new
    end
  end

  def show
    @song = Song.find(params[:id])
    render :show
  end

  def destroy
    song = Song.find(params[:id])
    song.destroy
    redirect_to user_url(current_user)
  end

  private
  def song_params
    params.require(:song).permit(:title, :album, :artist)
  end
end

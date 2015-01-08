class SongsController < ApplicationController
  before_action :prevent_delete, only: [:destroy, :edit, :update]
  def new
    @song = Song.new
  end

  def create
    @song = current_user.songs.new(song_params)

    if @song.save
      redirect_to song_url(@song)
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

  def edit
    @song = Song.find(params[:id])
  end

  def update
    @song = Song.find(params[:id])
    if @song.update_attributes(song_params)
      redirect_to song_url(@song)
    else
      flash.now[:errors] = @song.errors.full_messages
      render :edit
    end
  end

  private
  def song_params
    params.require(:song).permit(:title, :album, :artist)
  end

  def prevent_delete
    song = Song.find(params[:id])
    if current_user.id != song.uploader_id
      redirect_to user_url(User.find(song.uploader_id))
      flash[:errors] = ["You can't do that"]
    end
  end
end

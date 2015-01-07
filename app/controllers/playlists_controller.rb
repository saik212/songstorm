class PlaylistsController < ApplicationController
  def new
    @playlist = Playlist.new
    render :new
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.user_id = current_user.id
    if @playlist.save
      redirect_to user_playlist_url(current_user, @playlist)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render :new
    end
  end

  def show
    @playlist = Playlist.find(params[:id])
    @user = @playlist.user
    render :show
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    redirect_to user_url(current_user)
  end

  private
  def playlist_params
    params.require(:playlist).permit(:name)
  end
end

class Api::SongsController < ApplicationController
  # before_action :prevent_delete, only: [:destroy, :edit, :update]
  # wrap_parameters false

  def new
    @song = Song.new
    render :new
  end

  def index
    @songs = params[:user_id] ? Song.where(uploader_id: params[:user_id]) : Song.all
    render json: @songs
  end

  def create
    @song = current_user.songs.new(song_params)
    if @song.save
      render :show
    else
      render json: @song.errors.full_messages, status: 422
      # puts @song.errors.full_messages
    end
  end

  def show
    @song = Song.includes(comments: :user).find(params[:id])
    render :show
  end

  def destroy
    @song = Song.find(params[:id])
    @song.destroy
    render json: @song
    #redirect_to "/#/users/#{current_user.id}"
    # redirect_to user_url(current_user)
  end

  def edit
    @song = Song.find(params[:id])
  end

  def update
    @song = Song.find(params[:id])
    if @song.update_attributes(song_params)
      render :show
      # redirect_to song_url(@song)
    else
      # flash.now[:errors] = @song.errors.full_messages
      render json: @song.errors.full_messages
    end
  end

  private
  def song_params
    params.require(:song).permit(:title, :artist, :album, :playlists, :audio, :audio_url, :likers)
  end

  # def prevent_delete
  #   song = Song.find(params[:id])
  #   if current_user.id != song.user_id
  #     redirect_to "/#/users/#{song.user_id}"
  #     # redirect_to user_url(User.find(song.user_id))
  #     # flash[:errors] = ["You can't do that"]
  #   end
  # end
end

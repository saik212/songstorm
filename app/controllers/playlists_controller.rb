# class PlaylistsController < ApplicationController
#   before_action :prevent_delete, only: [:destroy, :edit, :update]
#   def new
#     @playlist = Playlist.new
#     render :new
#   end

#   def create
#     @playlist = current_user.playlists.new(playlist_params)
    
#     if @playlist.save
#       redirect_to playlist_url(@playlist)
#     else
#       flash.now[:errors] = @playlist.errors.full_messages
#       render :new
#     end
#   end

#   def show
#     @playlist = Playlist.find(params[:id])
#     render :show
#   end

#   def destroy
#     @playlist = Playlist.find(params[:id])
#     @playlist.destroy
#     redirect_to user_url(current_user)
#   end

#   def edit
#     @playlist = Playlist.find(params[:id])
#   end

#   def update
#     @playlist = Playlist.find(params[:id])
#     if @playlist.update_attributes(playlist_params)
#       redirect_to playlist_url(@playlist)
#     else
#       flash.now[:errors] = @playlist.errors.full_messages
#       render :edit
#     end
#   end

#   private
#   def playlist_params
#     params.require(:playlist).permit(:name)
#   end

#   def prevent_delete
#     playlist = Playlist.find(params[:id])
#     if current_user.id != playlist.user_id
#       redirect_to user_url(User.find(playlist.user_id))
#       flash[:errors] = ["You can't do that"]
#     end
#   end
# end

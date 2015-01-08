class CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def create
    @comment = current_user.comments.new(comment_params)
    if @comment.save
      if @comment.commentable_type == "Song"
        redirect_to song_url(Song.find(@comment.commentable_id))
      else
        redirect_to playlist_url(Playlist.find(@comment.commentable_id))
      end
    else
      flash.now[:errors] = @comment.errors.full_messages
    end
  end


  private
  def comment_params
    params.require(:comment).permit(:body, :commentable_type, :commentable_id)
  end
end

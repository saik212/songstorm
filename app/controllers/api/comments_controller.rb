class Api::CommentsController < ApplicationController
  def new
    @comments = Comment.new
  end

  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment
    else
      flash.now[:errors] = @comment.errors.full_messages
      render json: flash[:errors]
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(comment_params)
      render json: @comment
    else
      flash.now[:errors] = @comment.errors.full_messages
      render json: flash[:errors]
    end
  end


  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    render json: comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end

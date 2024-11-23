class CommentsController < ApplicationController

  def create
    @photo = Photo.find(params[:photo_id])
    @user = User.find(params[:user_id])
  
    # Create a new comment with the content and associated user and photo
    @comment = @photo.comments.new(comment_params)
    @comment.user = @user

    # Try to save the comment
    if @comment.save
      # Redirect back to the photo's page or wherever you need
      redirect_to user_photo_comments_path(@user, @photo),
        notice: 'Your comment has been posted!'
    else
      # If the comment doesn't save (e.g., due to validation errors), re-render the photo page with errors
      redirect_to user_photo_comments_path(@user, @photo),
        alert: 'There was an error posting your comment.'
    end

  end

  def index
    @user = User.find(params[:user_id])
    @photo = Photo.find(params[:photo_id])
  end


  private

  # It enforces the data coming in the request mody.
  def comment_params
    params.require(:comment).permit(:comment)
  end

end
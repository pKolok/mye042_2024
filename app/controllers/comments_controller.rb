class CommentsController < ApplicationController

  def create
    @photo = Photo.find(params[:photo_id])
    @user = User.find(params[:user_id])
  
    # Create a new comment with the content and associated user and photo
    @comment = @photo.comments.new(comment_params)
    @comment.user = @user

    # Try to save the comment
    if @comment.save
      render json: {
        comment_html: render_to_string(partial: 'comments/comment',
        formats: [:html], locals: { comment: @comment })
      }, status: :created
    else
      # Respond with errors if validation fails
      render json: { errors: @comment.errors.full_messages },
        status: :unprocessable_entity
    end

  end

  def index
    @user = User.find(params[:user_id])
    @photo = Photo.find(params[:photo_id])

    render(:partial => 'photo_comments') if request.xhr?
  end

  def destroy
    @user = User.find(params[:user_id])
    @photo = Photo.find(params[:photo_id])
    @comment = Comment.find(params[:id])

    # Find the follow relationship and destroy it
    @comment.delete()

    respond_to do |format|
      format.js { head :no_content }
    end
  end

  private

  # It enforces the data coming in the request mody.
  def comment_params
    params.require(:comment).permit(:comment)
  end

end
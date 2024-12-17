class PhotosController < ApplicationController
  
  def create
    @user = User.find(params[:user_id])
    if params[:photo] == nil
      flash[:alert] = "Please upload a photo"
      redirect_to :back
    else
      @photo = Photo.create(photo_params)
      @photo.user_id = @user.id
      @photo.save
      flash[:notice] = "Successfully uploaded a photo"
      redirect_to user_path(@user)
    end
  end

  def new
    @user = User.find(params[:user_id])
    @photo = Photo.create()
  end

  def destroy
    @user = User.find(params[:user_id])
    @photo = Photo.find(params[:id])

    if @user.id == @photo.user.id
      if @photo.destroy
        respond_to do |format|
          format.json { head :no_content }
        end
      else
        respond_to do |format|
          format.json { render json: { error: 'Failed to delete photo' },
            status: :unprocessable_entity }
        end
      end
      
    else
      flash[:alert] = "Cannot delete image of a different user"
    end
    
  end

  private
  def photo_params
    params.require(:photo).permit(:image, :title)
  end

end

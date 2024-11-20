class UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    @user.valid?
    if !@user.is_email?
      flash[:alert] = "Input a properly formatted email."
      redirect_to :back
    elsif @user.errors.messages[:email] != nil
      flash[:notice]= "That email " + @user.errors.messages[:email].first
      redirect_to :back
    elsif @user.save
      flash[:notice]= "Signup successful. Welcome to the site!"
      session[:user_id] = @user.id
      redirect_to user_path(@user)
    else
      flash[:alert] = "There was a problem creating your account. Please try again."
      redirect_to :back
    end
  end

  def new
  end

  def show
    @users = User.all
    @user = User.find(params[:id])
    @tag = Tag.new
    
    # Get list of users not being followed
    excludedIds = @user.followees.pluck(:id)
    excludedIds.append(@user.id)
    @users_not_followed = User.where("id NOT IN (?)", excludedIds)

    # Get list of combined photos of current user and user followees'
    photoIds = @user.photos.pluck(:id)
    @user.followees.each do |followee|
      photoIds.push(*followee.photos.pluck(:id))
    end
    @user_and_followee_photos = Photo.where("id in (?)", photoIds)
      .order("created_at DESC")

  end

  private

    def user_params
      params.require(:user).permit(:email, :password, :password_confirmation, :avatar)
    end

end
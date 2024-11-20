class FollowsController < ApplicationController
  # TODO: check
  before_action :authenticate_user!  # To ensure the user is logged in

  def create
    @current_user = User.find(params[:user_id])
    @user_to_follow = User.find(params[:user_to_follow])

    # Check if the current user is not already following the user
    unless @current_user.followees.include?(@user_to_follow)
      # Create a new follow record
      @current_user.followees << @user_to_follow
    end

    redirect_to user_path(@current_user)
  end

  def destroy
    @current_user = User.find(params[:user_id])
    @user_to_unfollow = User.find(params[:user_to_unfollow])

    # Find the follow relationship and destroy it
    current_user.followees.delete(@user_to_unfollow)

    redirect_to user_path(current_user)
  end

end
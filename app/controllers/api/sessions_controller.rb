class Api::SessionsController < ApplicationController

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      render :show
    else
      render json: "Invalid Credentials", status: 422
    end
  end

  def show
    if current_user
      render :show
    else
      render json: {}
    end
  end

  def destroy
    sign_out
    render json: {}
  end
end

# class SessionsController < ApplicationController
#   skip_before_action :require_signed_in!, only: [:create, :new]
#   def new
#   end

#   def create
#     user = User.find_by_credentials(
#       params[:user][:username],
#       params[:user][:password]
#     )

#     if user
#       sign_in(user)
#       redirect_to "/#/users/#{user.id}"
#     else
#       flash.now[:errors] = ["Invalid username or password"]
#       render :new
#     end
#   end

#   def destroy
#     sign_out
#     redirect_to new_session_url
#   end
# end

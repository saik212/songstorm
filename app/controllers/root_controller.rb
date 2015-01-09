class RootController < ApplicationController
  def root
    redirect_to new_session_url unless signed_in?
  end
end

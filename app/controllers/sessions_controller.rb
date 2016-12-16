class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_username(params[:session][:username])

    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to user_path(user)
    else
      @errors = ["The username and password you entered do not match."]

    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end
end

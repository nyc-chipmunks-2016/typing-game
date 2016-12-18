class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by_username(params[:session][:username]).try(:authenticate, params[:session][:password])
    if request.xhr?
      if user
        session[:user_id] = user.id
        user_path(user)
        render status: 200, json: {:user_link => user_path(user)}
      else
        render status: 400, json: {:errors => ["The username and password you entered do not match."]}
      end
    else
      if user
        session[:user_id] = user.id
        redirect_to user_path(user)
      else
        @errors = ["The username and password you entered do not match."]
        redirect_to "/login"
      end
    end
  end

  def destroy
    session.clear
    redirect_to root_path
  end
end

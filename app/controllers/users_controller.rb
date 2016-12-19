class UsersController < ApplicationController
  def show
    @games = Game.order_by_high_scores
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if request.xhr?
      if @user.save
        session[:user_id] = @user.id
        render status: 200, json: {:user_link => user_path(@user)}
      else
        render status: 400, json: {:errors => @user.errors.full_messages}
      end
    else
      if @user.save
        session[:user_id] = @user.id
        redirect_to root_path
      else
        @errors = @user.errors.full_messages
        render new_user_path
      end
    end
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(user_params)
    if @user.save
      redirect_to root_path
    else
      @errors = @user.errors.full_messages
      render 'edit'
    end
  end

  private
    def user_params
      params.require(:user).permit(:username, :email, :password)
    end
end

class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to root_path
    else
      @errors = @user.errors.full_messages
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

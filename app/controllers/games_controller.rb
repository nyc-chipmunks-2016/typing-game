class GamesController < ApplicationController
  def new
  end

  def create
    @game = Game.new(game_params)
    @game.user = current_user
    @game.save
  end

  def words
    render json: Category.find_by(name: params[:category])
                         .words
                         .where(level: params[:level])
                         .order("random()")
                         .limit(30)
  end

  private

  def game_params
    params.require(:game).permit(:wpm, :score, :accuracy, :time, :level, :keystrokes)
  end
end

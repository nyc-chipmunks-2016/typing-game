class GamesController < ApplicationController
  def new
  end

  def create
    @game = Game.new(game_params)
    @game.user = current_user
    @game.save
  end

  def words
    render json: Word.where(level: params["level"]).order("random()")
  end

  private

  def game_params
    params.require(:game).permit(:wpm, :score, :accuracy, :time, :level, :keystrokes)
  end
end

class GamesController < ApplicationController
  def new
  end

  def create
    p params
    @game = Game.new(wpm: params["wpm"], score: params["score"], accuracy: params["accuracy"], time: params["time"], level: params["level"])
    @game.user = current_user
    @game.save
  end

  def words
    render json: Word.where(level: params["level"])
  end
end

class GamesController < ApplicationController
  def new
  end

  def create
    @game = Game.new(wpm: params["wpm"], score: params["score"], accuracy: params["accuracy"])
    @game.user = current_user
    @game.save
  end

  def words
    render json: Word.all
  end
end

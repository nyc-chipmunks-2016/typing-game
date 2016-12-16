class GamesController < ApplicationController
  def new
    @game = Game.new(score: 0)
    @game.words = Word.all
  end

  def words
    render json: Word.all
  end
end

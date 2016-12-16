class GamesController < ApplicationController
  def new
    @game = Game.new(score: 0)
    @game.words = Word.all
  end

  # this logic only works when a game is being populated with every word in the database
  # if we want to use random collections of words, this json rendering below will have to inherit from the @game above
  def words
    render json: Word.all
  end
end

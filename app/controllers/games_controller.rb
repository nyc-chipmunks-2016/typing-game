class GamesController < ApplicationController
  def new
  end

  def create
    @game = Game.new(wpm: params["wpm"], score: params["score"], accuracy: params["accuracy"])
    @game.user = current_user
    @game.save
  end

  # this logic only works when a game is being populated with every word in the database
  # if we want to use random collections of words, this json rendering below will have to inherit from the @game above
  def words
    render json: Word.all
  end
end

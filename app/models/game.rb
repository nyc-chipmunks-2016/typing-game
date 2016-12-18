class Game < ActiveRecord::Base
  has_and_belongs_to_many :words
  belongs_to :user

  validates_presence_of :score, :wpm, :accuracy

  def self.order_by_high_scores
    # Needs to be grouped by user so that one user only has one high score
    # .group runs into an error if games.id is not included
    Game.group(:id, :user_id)
        .order(score: :desc)
        .limit(10)
  end
end

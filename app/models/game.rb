class Game < ActiveRecord::Base
  has_and_belongs_to_many :words
  belongs_to :user

  validates_presence_of :score, :wpm, :accuracy

  def self.order_by_high_scores
    Game.group(:id, :user_id)
        .order(score: :desc)
        .limit(10)
  end
end

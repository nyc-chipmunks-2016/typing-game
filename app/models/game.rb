class Game < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :score, :wpm, :accuracy, :time, :level, :keystrokes

  def self.order_by_high_scores
    Game.group(:id, :user_id)
        .order(score: :desc)
        .limit(10)
  end
end

class Game < ActiveRecord::Base
  belongs_to :user

  # validate the existence of the associated user as well:
  validates_presence_of :score, :wpm, :accuracy, :time, :level, :keystrokes # , :user

  def self.order_by_high_scores
    Game.group(:id, :user_id)
        .order(score: :desc)
        .limit(10)
  end
end

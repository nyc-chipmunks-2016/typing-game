class User < ActiveRecord::Base
  has_secure_password
  has_many :games

  has_attached_file :avatar, styles: { medium: "200x200>", thumb: "100x100>" ,:small  => "200x200>" }, default_url: "medium/volcanoIcon.png"

  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  before_save {self.email = email.downcase}
  validates :username, { presence: true, uniqueness: true, length: { maximum: 25 } }
  validates :email, { presence: true, length: { maximum: 105 }, uniqueness: true }

  def high_score
    games.order(Game.arel_table['score'].desc).limit(1).first.score
  end

  def average_wpm
    weighted_wpm = most_recent_games.map { |game| game.wpm * game.time }
    total_wpm = weighted_wpm.reduce(:+)
    total_time = most_recent_games.reduce(0) { |total, game| total + game.time }
    total_wpm / total_time
  end

  def average_accuracy
    weighted_accuracy = most_recent_games.map { |game| game.accuracy * game.keystrokes }
    total_accuracy = weighted_accuracy.reduce(:+)
    total_keystrokes = most_recent_games.reduce(0) { |total, game| total + game.keystrokes }
    total_accuracy / total_keystrokes
  end

  def most_recent_games
    games.order(Game.arel_table['created_at'].desc).limit(10)
  end
end

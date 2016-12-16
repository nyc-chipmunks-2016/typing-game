class Word < ActiveRecord::Base
  has_and_belongs_to_many :games
end

class Game < ActiveRecord::Base
  has_and_belongs_to_many :words
  belongs_to :user
end

class Word < ActiveRecord::Base
  belongs_to :category

  validates_presence_of :text, :points, :x, :y, :level#, :category
end

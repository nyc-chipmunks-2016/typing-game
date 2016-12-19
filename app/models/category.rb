class Category < ActiveRecord::Base
  has_many :words

  validates_presence_of :name
end

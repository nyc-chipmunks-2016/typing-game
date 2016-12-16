class User < ActiveRecord::Base
    has_secure_password
    has_many :games

    before_save {self.email = email.downcase}
    validates :username, {presence: true, uniqueness: true, length: {maximum: 25}}
    validates :email, {presence: true, length:{maximum: 105}, uniqueness: true}
end

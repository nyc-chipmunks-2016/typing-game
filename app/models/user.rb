class User < ActiveRecord::Base
    has_secure_password
    before_save {self.email = email.downcase}

    validates :username, presence: true,uniqueness: true,length: {minimum: 5, maximum: 25}
    VALID_EMAIL_REGEX= /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length:{maximum: 105},uniqueness: true,format: {with: VALID_EMAIL_REGEX}

end

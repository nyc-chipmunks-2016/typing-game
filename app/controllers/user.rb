class User < ActiveRecord::Base
    has_many :articles, dependent: :destroy
    has_secure_password
    before_save {self.email = email.downcase}
    validates :username, presence: true,
                uniqueness: true,
                length: {minimum: 5, maximum: 25}

    validates :password_digest, presence: true,
              uniqueness: {case_sensitive: false},
              length: {minimum: 6}
    VALID_EMAIL_REGEX= /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length:{maximum: 105},
                uniqueness: true,
                format: {with: VALID_EMAIL_REGEX}

end

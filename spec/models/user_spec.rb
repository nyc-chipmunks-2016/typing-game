require 'rails_helper'

RSpec.describe User, type: :model do
  describe "User Model" do
    it "requires presences of an username" do
      user = User.new(username: "")
      user.valid?
      expect(user.errors[:username].any?).to eq(true)
    end
    
    it "has a unique username" do
      user_1 = User.create(username: "arsy21", email: "arsy11@gmail.com",
      password: "password")
      user_2 = User.new(username: "arsy21", email: "arsy1111@gmail.com",
      password: "password1")
      user_2.valid?
      expect(user_2.errors[:username].any?).to eq(true)
    end

    it "requires presences of an email" do
      user = User.new(email: "")
      user.valid?
      expect(user.errors[:email].any?).to eq(true)
    end

    it "has an a unique email address" do
      user_1 = User.create(username: "arsy21", email: "arsy11@gmail.com",
      password: "password")
      user_2 = User.new(username: "arsh24", email: "arsy11@gmail.com",
      password: "password1")
      user_2.valid?
      expect(user_2.errors[:email].any?).to eq(true)
    end

    it "requires presences of an password" do
      user = User.new(password: "")
      user.valid?
      expect(user.errors[:password].any?).to eq(true)
    end

    it "automatically encrypts the password using Bycrypt" do
    user = User.new(password: "password")
    expect(user.password_digest.present?).to eq(true)
    end
  end
end

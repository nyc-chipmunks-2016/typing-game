require "rails_helper"

RSpec.describe UsersController, :type => :controller do
	let(:valid_session) do
		{ user_id: 1 }
	end

	let(:valid_attributes) do
		{ email: "arsy209@gmail.com", username: "arsy21",password: "123456"}
	end

	let(:invalid_attributes) do
		{ username: nil }
	end

	it " Should allow a  uer to be created with valid attributes" do
	  newuser = User.create! valid_attributes
	end

describe "POST #create" do
  it " should create a new user" do
    process :create, params: {user: valid_attributes}
    expect(assigns(:user)).to eq(User.last)
  end

  it "returns http success" do
    post :create, params: {user: valid_attributes}
    expect(response).to have_http_status(302)
  end

  context "When valid information is not put in" do
    it "does not create the user and returns nil" do
      post :create, params: { user: invalid_attributes}
      expect(User.find_by_username(valid_attributes[:username])).to be_nil
    end
  end

  describe "GET #show" do
    it "returns http success" do
      user = User.create!(valid_attributes)
      get :show, params: { id: user.id}
      expect(response).to have_http_status(:success)
      end
      after { puts "Completed"}
    end
  end
end

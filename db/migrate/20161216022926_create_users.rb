class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      # make sure db constraints match validations
      # because the database is the keeper of the data
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :email, null: false

      t.timestamps(null:false)
    end
  end
end

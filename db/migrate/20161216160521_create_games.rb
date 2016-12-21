class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      # make sure db constraints match validations
      # because the database is the keeper of the data
      t.float    :wpm, null: false
      t.float    :accuracy, null: false
      t.integer  :score, null: false
      t.float    :time, null: false
      t.integer  :level, null: false
      t.integer  :keystrokes, null: false
      t.references :user, index: true, foreign_key: true

      t.timestamps(null: false)
    end
  end
end

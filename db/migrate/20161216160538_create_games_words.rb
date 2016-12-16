class CreateGamesWords < ActiveRecord::Migration[5.0]
  def change
    create_table :games_words do |t|
      t.references :game, index: true, foreign_key: true
      t.references :word, index: true, foreign_key: true

      t.timestamps(null: false)
    end
  end
end

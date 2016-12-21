class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      # make sure db constraints match validations
      # because the database is the keeper of the data
      t.string   :text, null: false
      t.integer  :points, null: false
      t.integer  :x, null: false
      t.integer  :y, null: false
      t.integer  :level, null: false
      t.references :category
      # foreign_key: true for foreign keys

      t.timestamps(null: false)
    end
  end
end

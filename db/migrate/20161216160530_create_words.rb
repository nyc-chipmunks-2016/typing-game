class CreateWords < ActiveRecord::Migration[5.0]
  def change
    create_table :words do |t|
      t.string   :text, null: false
      t.integer  :points, null: false
      t.integer  :x, null: false
      t.integer  :y, null: false

      t.timestamps(null: false)
    end
  end
end

class CreateCategories < ActiveRecord::Migration[5.0]
  def change
    create_table :categories do |t|
      # make sure db constraints match validations
      # because the database is the keeper of the data
      t.string   :name, null: false

      t.timestamps(null: false)
    end
  end
end

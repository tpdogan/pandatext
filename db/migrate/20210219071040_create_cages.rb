class CreateCages < ActiveRecord::Migration[6.1]
  def change
    create_table :cages do |t|
      t.string :name
      t.string :creator

      t.timestamps
    end
  end
end

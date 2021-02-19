class CreateAnthropotexts < ActiveRecord::Migration[6.1]
  def change
    create_table :anthropotexts do |t|
      t.string :body
      t.integer :animal_id
      t.integer :cage_id

      t.timestamps
    end
  end
end

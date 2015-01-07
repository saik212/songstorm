class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title, null: false
      t.string :artist
      t.string :album
      t.integer :uploader_id, null: false

      t.timestamps
    end
  end
end

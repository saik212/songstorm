class PlaylistSongs < ActiveRecord::Migration
  def change
    create_table :playlist_songs do |t|
      t.integer :song_id, null: false
      t.integer :playlist_id, null: false

      t.timestamps
    end
  end
end

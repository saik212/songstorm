class AddImageColumnsToSongsAndPlaylists < ActiveRecord::Migration
  def self.up
    add_attachment :songs, :image
    add_attachment :playlists, :image
  end

  def self.down
    remove_attachment :songs, :image
    remove_attachment :playlists, :image
  end
end

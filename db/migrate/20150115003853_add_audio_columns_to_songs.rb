class AddAudioColumnsToSongs < ActiveRecord::Migration
  def self.up
    add_attachment :songs, :audio
  end

  def self.down
    remove_attachment :songs, :audio
  end
end

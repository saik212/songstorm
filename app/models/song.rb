class Song < ActiveRecord::Base

  belongs_to :uploader, class_name: "User", foreign_key: :uploader_id
  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :song_id

  has_many :playlists, through: :playlist_songs, source: :playlist
  has_many :comments, as: :commentable, dependent: :destroy
end

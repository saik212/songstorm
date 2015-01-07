class Playlist < ActiveRecord::Base
  validates :name, :user_id, presence: true

  belongs_to :user

  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :playlist_id

  has_many :songs, through: :playlist_songs, source: :song
end

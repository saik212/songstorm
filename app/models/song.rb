class Song < ActiveRecord::Base
  include PgSearch

  multisearchable against: [:title, :artist, :album]

  belongs_to :uploader, class_name: "User", foreign_key: :uploader_id
  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :song_id

  has_many :playlists, through: :playlist_songs, source: :playlist
  has_many :comments, as: :commentable, dependent: :destroy


  has_attached_file :audio

  validates_attachment_content_type :audio,
  :content_type => [
    'audio/mpeg',
    'audio/x-mpeg',
    'audio/mp3',
    'audio/x-mp3',
    'audio/mpeg3',
    'audio/x-mpeg3',
  ]


end

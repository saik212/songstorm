class Song < ActiveRecord::Base
  include PgSearch

  pg_search_scope :search_by_all, against: [:title, :artist, :album]

  # multisearchable against: [:title, :artist, :album]

  belongs_to :uploader, class_name: "User", foreign_key: :uploader_id
  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :song_id

  has_many :playlists, through: :playlist_songs, source: :playlist
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes
  has_many :likers, through: :likes, source: :user


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


  def audio_url=(audio_url)
    unless self.audio.exists?
      self.audio = audio_url
    end
  end

end

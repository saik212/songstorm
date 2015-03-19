class Song < ActiveRecord::Base
  validates :title, :audio, presence: true
  include PgSearch

  pg_search_scope :search_by_all, against: [:title, :artist, :album]

  belongs_to :uploader, class_name: "User", foreign_key: :uploader_id
  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :song_id

  has_many :playlists, through: :playlist_songs, source: :playlist
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :likes, dependent: :destroy
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

  has_attached_file :image,
    :styles => { :medium => "300x300>", :thumb => "100x100>" },
    :default_url => "missing-img.png"

  validates_attachment_content_type :image,
    :content_type => /\Aimage\/.*\Z/


  def audio_url=(audio_url)
    unless self.audio.exists?
      self.audio = audio_url
    end
  end

  def days_ago
    ((Time.now - self.created_at.to_time)/86400).to_i
  end

end

class Playlist < ActiveRecord::Base
  validates :name, :user_id, presence: true

  belongs_to :user

  has_many :playlist_songs, class_name: "PlaylistSong", foreign_key: :playlist_id

  has_many :songs, through: :playlist_songs, source: :song
  has_many :comments, as: :commentable, dependent: :destroy

  has_attached_file :image,
    :styles => { :medium => "300x300>", :thumb => "100x100>" },
    :default_url => "missing-img.png"

  validates_attachment_content_type :image,
    :content_type => /\Aimage\/.*\Z/
end

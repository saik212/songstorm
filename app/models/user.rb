class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :playlists, dependent: :destroy
  has_many :songs, class_name: "Song", foreign_key: :uploader_id, dependent: :destroy
  has_many :comments, class_name: "Comment", foreign_key: :user_id, dependent: :destroy
  has_many :likes, class_name: "Like", foreign_key: :user_id, dependent: :destroy
  has_many :liked_songs, through: :likes, source: :song

  has_attached_file :image,
    :styles => { :medium => "300x300>", :thumb => "100x100>" },
    :default_url => "missing-img.png"

  validates_attachment_content_type :image,
    :content_type => /\Aimage\/.*\Z/

  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.valid_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def valid_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def image_url=(image_url)
    unless self.image.exists?
      self.image = image_url
    end
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

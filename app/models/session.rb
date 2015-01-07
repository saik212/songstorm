class Session < ActiveRecord::Base
  validates :session_token, :user_id, presence: true
  validates :session_token, uniqueness: true

  def create_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end

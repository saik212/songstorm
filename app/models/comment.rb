class Comment < ActiveRecord::Base
  validates :body, :user_id, presence: true

  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def days_ago
  	((Time.now - self.created_at.to_time)/86400).to_i
  end

  def at_time
  	hour = created_at.time.hour
  	min = created_at.time.min
  	time = ""

  	if hour.to_i >= 10
	  	time = "#{created_at.time.hour} : #{created_at.time.min}"
	  else
	  	time = "0#{created_at.time.hour} : #{created_at.time.min}"
	  end

	  time

  end
  
end

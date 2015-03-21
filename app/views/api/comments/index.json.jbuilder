json.array! @comments do |comment|
  json.extract! comment, :id, :user_id, :body, :created_at
  json.author_image comment.user.image.url
  json.days_ago comment.days_ago
	json.create_time comment.at_time
end

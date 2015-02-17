json.array! @comments do |comment|
  json.extract! comment, :id, :user_id, :body, :created_at
  json.author_image comment.user.image.url
end

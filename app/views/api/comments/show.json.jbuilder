json.extract! @comment, :id, :user_id, :body, :created_at, :updated_at

  json.user @comment.user_id

  json.created_at @comment.created_at
  json.updated_at @comment.updated_at

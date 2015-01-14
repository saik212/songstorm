json.array! @comments do |comment|
  json.extract! comment, :id, :user_id, :song_id, :body, :created_at, :updated_at

  json.id comment.id
  json.song_id comment.commentable_id
  json.user_id comment.user_id
  json.body comment.body

  json.created_at song.created_at
  json.updated_at song.updated_at

end

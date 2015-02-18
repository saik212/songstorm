json.extract! @song, :id, :title, :artist, :uploader_id, :album, :created_at, :updated_at
json.audio_url asset_path(@song.audio.url)
json.image_url asset_path(@song.image.url)

json.playlists @song.playlists do |playlist|
	json.id playlist.id
	json.name  playlist.name
	json.user_id playlist.user_id
	json.owner playlist.user.username
	json.image_url asset_path(playlist.image.url)

	json.created_at playlist.created_at
	json.updated_at playlist.updated_at
end

json.playlist_songs @song.playlist_songs do |playlist_song|
	json.id playlist_song.id
	json.song_id playlist_song.song_id
	json.playlist_id playlist_song.playlist_id

	json.created_at playlist_song.created_at
	json.updated_at playlist_song.updated_at
end

json.comments @song.comments do |comment|
	json.id comment.id
	json.commentable_id comment.commentable_id
	json.commentable_type comment.commentable_type
	json.body comment.body
	json.user_id comment.user_id
	json.author comment.user.username
	json.author_image comment.user.image.url
end

json.likers @song.likers do |liker|
	json.username liker.username
end

json.liked_by_current_user @song.likers.to_a.include?(User.find(current_user.id))
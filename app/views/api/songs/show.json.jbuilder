json.extract! @song, :id, :title, :artist, :album, :created_at, :updated_at

json.playlists @song.playlists do |playlist|
	json.id playlist.id
	json.name  playlist.name
	json.user_id playlist.user_id

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
	json.song_id comment.commentable_id
	json.body comment.body
	json.user_id comment.user_id
end

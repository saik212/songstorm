json.extract! @song, :id, :title, :artist, :album, :created_at, :updated_at

json.playlists @song.playlists do |playlist|
	json.name  playlist.name
	json.user_id playlist.user_id

	json.created_at playlist.created_at
	json.updated_at playlist.updated_at
end
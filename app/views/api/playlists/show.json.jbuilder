json.extract! @playlist, :id, :name, :user_id, :created_at, :updated_at
json.owner @playlist.user.username
json.owner_image @playlist.user.image.url
json.image_url asset_path(@playlist.image.url)


json.songs @playlist.songs do |song|
	json.audio_url asset_path(song.audio.url)
	json.image_url asset_path(song.image.url)
	json.id song.id
	json.title song.title
	json.album song.album
	json.artist song.artist
	json.uploader_id song.uploader_id

	json.created_at song.created_at
	json.updated_at song.updated_at
end

json.playlist_songs @playlist.playlist_songs do |playlist_song|
	json.id playlist_song.id
	json.song_id playlist_song.song_id
	json.playlist_id playlist_song.playlist_id

	json.created_at playlist_song.created_at
	json.updated_at playlist_song.updated_at
end


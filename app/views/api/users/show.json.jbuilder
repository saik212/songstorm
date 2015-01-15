json.extract! @user, :id, :username, :created_at, :updated_at
json.image_url asset_path(@user.image.url)

json.songs @user.songs do |song|
	json.audio_url asset_path(song.audio.url)
	json.id song.id
	json.title song.title
	json.album song.album
	json.artist song.artist
	json.uploader_id song.uploader_id

	json.created_at song.created_at
	json.updated_at song.updated_at
end

json.playlists @user.playlists do |playlist|
	json.id playlist.id
	json.name playlist.name
	json.user_id playlist.user_id

	json.created_at playlist.created_at
	json.updated_at playlist.updated_at
end

json.is_current_user(@user.id === current_user.id)

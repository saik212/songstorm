json.extract! @user, :id, :username, :created_at, :updated_at
json.image_url asset_path(@user.image.url)

json.songs @user.songs do |song|
	json.audio_url asset_path(song.audio.url)
	json.image_url asset_path(song.image.url)
	json.id song.id
	json.title song.title
	json.album song.album
	json.artist song.artist
	json.uploader_id song.uploader_id
	json.num_likes song.likes.count

	json.created_at song.created_at
	json.updated_at song.updated_at
end

json.playlists @user.playlists do |playlist|
	json.image_url asset_path(playlist.image.url)
	json.id playlist.id
	json.name playlist.name
	json.user_id playlist.user_id
	json.num_pl_songs playlist.songs.count

	json.created_at playlist.created_at
	json.updated_at playlist.updated_at
end

json.liked_songs @user.liked_songs do |liked_song|
	json.id liked_song.id
	json.title liked_song.title
	json.artist liked_song.artist
	json.album liked_song.album
end

if current_user
	json.is_current_user(@user.id === current_user.id)
end

json.joinDate "#{Date::MONTHNAMES[@user.created_at.month]} #{@user.created_at.year}"
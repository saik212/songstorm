json.array! @likes do |like|
	json.id like.id
	json.user_id like.user_id
	json.song_id like.song_id

	json.song_title like.song.title
	json.song_image asset_path(like.song.image.url)
	json.song_audio asset_path(like.song.audio.url)
end


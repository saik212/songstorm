json.array! @liked_songs do |like|
	json.title like.title
	json.artist like.artist
	json.album like.album
	json.image_url asset_path(like.image.url)
	json.audio_url asset_path(like.audio.url)
end
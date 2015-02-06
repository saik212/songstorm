json.array! @liked_songs do |like|
	json.title like.title
	json.artist like.artist
	json.album like.album
end
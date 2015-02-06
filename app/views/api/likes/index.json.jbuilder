
json.array! @likes do |like|
	json.id like.id
	json.user_id like.user_id
	json.song_id like.song_id

	json.song like.song
	json.songTitle like.song.title
	

end


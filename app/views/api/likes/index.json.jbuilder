json.array! @likes do |like|

	json.user like.user_id
	json.song like.song_id
	

end


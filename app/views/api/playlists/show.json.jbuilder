json.extract! @playlist, :id, :name, :created_at, :updated_at

json.songs @playlist.songs do |song|
	json.id song.id
	json.title song.title
	json.album song.album
	json.artist song.artist
	json.uploader_id song.uploader_id

	json.created_at song.created_at
	json.updated_at song.updated_at
end

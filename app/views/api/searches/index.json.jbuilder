# json._page @search_results.current_page

json.results @search_results do |song|
	json.id song.id
	json.title song.title
	json.album song.album
	json._type "Song"
	# if model.class == Song
		# json.(song, :id, :title, :artist, :album)
		# json._type "Song"
	# end
end
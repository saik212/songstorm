json._page @search_results.current_page

json.results @search_results.map(&:searchable) do |model|
	if model.class == Song
		json.(song, :id, :title, :artist, :album)
		json._type "Song"
	end
end
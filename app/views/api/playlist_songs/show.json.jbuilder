json.extract! @playlist_song, :id, :song_id, :playlist_id, :created_at, :updated_at

json.song @playlist_song.song do |song|
  json.id song.id
  json.title song.title
  json.album song.album
  json.artist song.artist
  json.uploader_id song.uploader_id

  json.created_at song.created_at
  json.updated_at song.updated_at
end
json.playlist @playlist_song.playlist do |playlist|
  json.id playlist.id
  json.title playlist.title
  json.album playlist.album
  json.artist playlist.artist
  json.uploader_id playlist.uploader_id

  json.created_at playlist.created_at
  json.updated_at playlist.updated_at
end

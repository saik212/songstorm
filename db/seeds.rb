# Helpers
# 
# 
# 
song_urls = [
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg01.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg02.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg03.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg04.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg05.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg06.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg07.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg08.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg09.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg10.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg11.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg12.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg13.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg14.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg15.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg16.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg17.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg18.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg19.mp3",
  "https://s3.amazonaws.com/songstorm-pics/seeds/songs/sg20.mp3"
]

user_images = [
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/beat.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/blue.gif",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/gas-o.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img0.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img1.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img2.jpeg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img3.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img4.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img5.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img6.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img7.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img8.jpg",
  "https://s3.amazonaws.com/songstorm-pics/seeds/images/users/usr_img9.jpg"
]

def random_playlist_image
  playlist_images = [
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img0.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img1.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img2.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img3.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img4.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img5.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img6.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img7.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img8.png",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/pl_img9.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/playlists/bat-logo.png"
  ]

  playlist_images[rand(playlist_images.length)]
end

def random_song_image
  song_images = [
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img0.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img1.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img2.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img3.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img4.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img5.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img6.png",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img7.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img8.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sg_img9.jpg",
    "https://s3.amazonaws.com/songstorm-pics/seeds/images/songs/sunset.jpg"
  ]

  song_images[rand(song_images.length)]
end

def random_artist
  artists = [
    "Felders Collective", "Grim Grixis", "Bob Hamilton", "Satin",
    "Jet", "Green Hill Zone", "Dreamland64"
  ]

  artists[rand(artists.length)]
end

def random_title
  firsts = [
    "Wool", "Sorrid", "Chasmic", "Blue", "Crazed",
    "Whispering", "Idol", "Stormy", "Arctic", "Jovial",
    "Isotrope", "Bones'", "Mother", "Songstrel", "Grail" 
  ]

  lasts = [
    "Strings", "Colony", "Stampers", "Kastral", "Peak",
    "Piper", "Jest", "Daze", "Stream", "Ironhold",
    "Island", "Mountain", "Plains", "Swamp", "Forest"
  ]

  "#{firsts[rand(firsts.length)]} #{lasts[rand(lasts.length)]}"
end



# Seeding
# 
# 
# 
# 
User.create(
  username: "Sai",
  password: "alookard",
  image_url: user_images[3]
)

User.create(
  username: "Blue",
  password: "pollen",
  image_url: user_images[1]
)

User.create(
  username: "Beat",
  password: "pollen",
  image_url: user_images[0]
)

User.create(
  username: "Gas-0",
  password: "pollen",
  image_url: user_images[2]
)

User.create(
  username: "Bruce W.",
  password: "pollen",
  image_url: user_images[6]
)

song_urls.each do |song|
  Song.create(
    title: random_title,
    artist: random_artist,
    album: random_title,
    uploader_id: rand(1..5),
    audio_url: song,
    image: random_song_image
  )
end

10.times do 
  Playlist.create(
    name: random_title,
    user_id: rand(1..User.all.length),
    image: random_playlist_image
  )
end


User.all.each do |user|
  num_likes = rand(1..12)
  chosen_songs = []

  num_likes.times do 
    rand_song = rand(1..20)
    next if chosen_songs.include?(rand_song)

    chosen_songs << rand_song
    Like.create(
      user_id: user.id,
      song_id: rand_song
    )
  end

end

Playlist.all.each do |list|
  song_count = rand(1..7)
  chosen_songs = []

  song_count.times do
    song_choice = rand(1..20)
    next if chosen_songs.include?(song_choice)

    chosen_songs << song_choice
    PlaylistSong.create(
      playlist_id: list.id,
      song_id: song_choice
    )
  end
end
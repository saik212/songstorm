# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

song_urls = {
	rolento_theme: "http://s3.amazonaws.com/songstorm-pics/songs/audios/000/000/001/original/data?1425200209",
	
}


User.create(
    username: "Guy Fierce",
    password: "cool1234",
    image_url: "http://img3.wikia.nocookie.net/__cb20130601154317/disney/images/7/71/Donald-duck-disney-photo-450x400-dcp-cpna013154.jpg"
)

Song.create(
    title: "Dancing Queen",
    artist: "ABBA",
    album: "ABBA",
    uploader_id: 1,
    audio_url: "http://picosong.com/cdn/78ffff7ec26b4e0fa37a25ecab1152b2.mp3"
)

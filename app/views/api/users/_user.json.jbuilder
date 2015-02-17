json.(user, :id, :username)
json.image_url asset_path(user.image.url)
json._type "User"
class Song < ActiveRecord::Base

  belongs_to :uploader, class_name: "User", foreign_key: :uploader_id

end

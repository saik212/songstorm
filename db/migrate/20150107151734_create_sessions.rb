class CreateSessions < ActiveRecord::Migration
  def change
    create_table :sessions do |t|
      t.string :session_token
      t.integer :user_id

      t.timestamps
    end
  end
end

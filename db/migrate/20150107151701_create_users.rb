class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null:false
      t.string :email
      t.string :password_digest, null:false
      t.string :fname, null:false
      t.string :lname, null:false

      t.timestamps
    end

    add_index :users, :username
    add_index :users, :email
  end
end

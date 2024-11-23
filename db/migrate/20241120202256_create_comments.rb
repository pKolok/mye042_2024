class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments, :force => true, :id => false do |t|
      t.references :photo, null: false, index: true, foreign_key: true
      t.references :user, null: false, index: true, foreign_key: true
      t.text :comment

      t.timestamps null: false
    end
  end

  def self.down
    drop_table :comments
  end

end
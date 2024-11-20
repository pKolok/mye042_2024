class CreateFollows < ActiveRecord::Migration
  def self.up
    # :force => true : replaces old table
    # :id => false : does not create id column
    create_table :follows, :force => true, :id => false do |t|
      t.references :follower, null: false, index: true, foreign_key: true
      t.references :followee, null: false, index: true, foreign_key: true
    end
  end
  
end
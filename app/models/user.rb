class User < ActiveRecord::Base
  has_many :photos
  has_many :tags
  has_many :comments

  # follower_follows "names" the Follow join table for accessing through the follower association
  has_many :follower_follows, foreign_key: :followee_id, class_name: "Follow" 
  # source: :follower matches with the belong_to :follower identification in the Follow model 
  has_many :followers, through: :follower_follows, source: :follower

  # followee_follows "names" the Follow join table for accessing through the followee association
  has_many :followee_follows, foreign_key: :follower_id, class_name: "Follow"    
  # source: :followee matches with the belong_to :followee identification in the Follow model   
  has_many :followees, through: :followee_follows, source: :followee

  attr_accessor :password
  has_attached_file :avatar, :styles => { :medium => "300x300>", :thumb => "100x100>" }
  validates_attachment_content_type :avatar, :content_type => /\Aimage\/.*\Z/
  validates_confirmation_of :password
  before_save :encrypt_password
  validates :email, uniqueness: true

  validates :email, :presence => true
  def encrypt_password
    self.password_salt = BCrypt::Engine.generate_salt
    self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
  end

  def is_email?
    self.email.include?('@') && self.email.include?('.')
  end

  def self.authenticate(email, password)
    user = User.where(email: email).first
    if user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt)
      user
    else
      nil
    end
  end

end
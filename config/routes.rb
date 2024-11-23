Rails.application.routes.draw do
  get '/' => 'home#index'
  # root :to => 'home#index'
  root 'home#index'
  
  # /log-in routes
  get '/log-in' => "sessions#new"
  post '/log-in' => "sessions#create"

  # /users routes
  resources :users do

    # /users/id/photos routes
    resources :photos do

      # /users/id/photos/id routes
      resources :comments

    end

    # /users/id/follow & users/id/unfollow routes
    post 'follow/:user_to_follow', to: 'follows#create', as: 'follow'
    delete 'unfollow/:user_to_unfollow', to: 'follows#destroy', as: 'unfollow'

  end

  # /tags routes
  resources :tags, only: [:create, :destroy]

  # /log-out routes
  get '/log-out' => "sessions#destroy", as: :log_out

end

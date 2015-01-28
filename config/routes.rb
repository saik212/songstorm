Rails.application.routes.draw do
  root to:"root#root"

  namespace :api, defaults: {format: :json} do
    resource :session

    resources :users do
      resources :songs, only: [:index]
      resources :playlists, only: [:index]
    end

    resources :playlists do
      resources :songs, only: [:index]
    end

    resources :songs
    resources :comments

    resources :playlist_songs

    get 'search', to: "searches#index"
  end
end

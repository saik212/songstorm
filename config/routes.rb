Rails.application.routes.draw do
  root to:"root#root"

  namespace :api, defaults: {format: :json} do
    resource :session, only: [:create, :show, :destroy]

    resources :users, only: [:index, :show, :update, :create] do
      resources :likes, only: [:index]
    end

    resources :playlists, only: [:create, :index, :show, :update, :destroy]

    resources :songs, only: [:create, :index, :show, :update, :destroy]
    resources :comments, only: [:create, :index, :show, :destroy]

    resources :playlist_songs, only: [:create, :index, :destroy]
    resources :likes, only: [:index, :create, :destroy]

    get 'search', to: "searches#index"
  end
end

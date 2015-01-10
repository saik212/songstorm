Rails.application.routes.draw do
  # root to: "sessions#new"
  #
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :playlists, only: [:new, :create, :show, :destroy, :edit, :update]
  resources :songs, only: [:new, :create, :show, :destroy, :edit, :update]
  resources :comments, only: [:new, :create, :destroy]
  resources :playlist_songs, only:[:new, :create, :destroy]

  root to:"root#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:show]
    resources :playlists
    resources :songs
  end
end

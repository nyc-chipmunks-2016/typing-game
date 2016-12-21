Rails.application.routes.draw do
  # remove routes that are not actually utilized
  # except: or only:, etc.
  resources :users
  resources :games, except: [:edit, :index, :show, :update]

  root "home#index"

  get '/game-words' => 'games#words'

  get '/login', to: 'sessions#new'
  post '/sessions', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end

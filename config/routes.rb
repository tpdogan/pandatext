Rails.application.routes.draw do
  resources :cages, only: :index
  resources :zoos, only: :index
  devise_for :animals, :controllers => { :registrations => 'registrations' }
  root to: 'zoos#index'
end

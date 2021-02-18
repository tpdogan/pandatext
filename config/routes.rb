Rails.application.routes.draw do
  devise_for :animals, :controllers => { :registrations => 'registrations' }
  root to: 'zoos#index'
end

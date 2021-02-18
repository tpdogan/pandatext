class CagesController < ApplicationController
  before_action :authenticate_animal!
  def index
  end
end

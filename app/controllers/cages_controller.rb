class CagesController < ApplicationController
  before_action :authenticate_animal!
  def index
    @cage = Cage.find(params[:id])
  end
  def create
    creator = current_animal.name
    cage = Cage.create(cage_params)
    cage.update(:creator => creator)
    redirect_to cages_path(:id => cage.id)
  end
  private
  def cage_params
    params.require(:cage).permit(:name)
  end
end

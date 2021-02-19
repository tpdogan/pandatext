class AnthropotextsController < ApplicationController
  before_action :authenticate_animal!
  def create
    txt = Anthropotext.create(anthopo_params)
    txt.update(:cage_id => params[:cage_id], :animal_id => params[:animal_id])
    p txt
    if txt.save
      cage = Cage.find(params[:cage_id])
      name = current_animal.name
      data = {
        sender: name,
        body: txt.body,
        time: DateTime.now.strftime('%H:%M')
      }
      CageChannel.broadcast_to(cage, data.to_json)
    end
  end
  private
  def anthopo_params
    params.require(:anthropotext).permit(:body, :cage_id, :animal_id)
  end
end

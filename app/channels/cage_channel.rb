class CageChannel < ApplicationCable::Channel
  def subscribed
    if params[:id].to_i > 0
      cage = Cage.find(params[:id])
      stream_for cage
    end
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    cage = Cage.find(params[:id])
    data['animal'] = current_animal
    data['time'] = DateTime.now.strftime('%H:%M')
    CageChannel.broadcast_to(cage, data)
  end
end

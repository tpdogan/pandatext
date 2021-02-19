class CageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cage"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    data['animal'] = current_animal
    data['time'] = DateTime.now.strftime('%H:%M')
    ActionCable.server.broadcast('cage', data)
  end
end

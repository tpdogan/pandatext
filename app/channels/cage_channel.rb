class CageChannel < ApplicationCable::Channel
  def subscribed
    stream_from "cage"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast('cage', data)
  end
end

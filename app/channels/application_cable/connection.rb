module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_animal

    def connect
      self.current_animal = find_verified_animal
    end

    private
    def find_verified_animal
      if verified_animal = env['warden'].user
        verified_animal
      else
        reject_unauthorized_connection
      end
    end
  end
end

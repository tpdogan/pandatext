class Anthropotext < ApplicationRecord
  validates :body, presence: true
  belongs_to :animal
  belongs_to :cage
end

class Cage < ApplicationRecord
  validates :name, presence: true
  has_many :anthropotexts
end

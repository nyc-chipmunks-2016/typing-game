# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
words = %w(in this case there is no need to guess how many requests can be in an application that might finish in the future in some cases ajax requests can be part of a functions inner logic which can be quite complicated and in that case you might not wait until said)

words.each do |word|
  Word.create(text: word, points: word.length * 100, x: rand(50..400), y: 0)
end

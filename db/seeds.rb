# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

new_category = Category.create(name: "animals")

words = %w(owl yak lion dog bear cat bird horse zebra hippo monkey gorilla fish reptile frog snake lizard iguana rhino bee eagle fox gopher kangaroo spider jellyfish shrimp chickadee swan bison buffalo turtle tortoise deer armadillo quail squirrel giraffe goose vulture groundhog penguin seal roadrunner reindeer shark skunk sloth woodchuck)

words.each do |word|
  if word.length <= 4
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 1)
  end
  if word.length <= 5
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 2)
  end
  if word.length >= 4 && word.length <= 6
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 3)
  end
  if word.length >= 4 && word.length <= 7
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 4)
  end
  if word.length >= 5 && word.length <= 8
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 5)
  end
  if word.length >= 6
    new_category.words.create(text: word, points: word.length * 100, x: rand(25..400), y: 0, level: 6)
  end
end

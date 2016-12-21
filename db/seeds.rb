animal_category = Category.create(name: "animals")
default_category = Category.create(name: "default")
ruby_category = Category.create(name: "ruby")
javascript_category = Category.create(name: "javascript")

easy_letters = %w(a s d f g h j k l)
medium_letters = %w(q w e r t y u i o p)
hard_letters = %w(z x c v b n m)
capitalized_letters = ("A".."Z").to_a
numbers = %w(1 2 3 4 5 6 7 8 9 0)
special_characters = %w(` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \ " ' : ; / ? < > . ,)

ANIMAL_LIST_FILENAME = "db/fixtures/animal_list.txt"

File.foreach(ANIMAL_LIST_FILENAME) do |line|
  word = line.strip.downcase
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end
  if length <= 5
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end
  if length >= 4 && length <= 6
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end
  if length >= 4 && length <= 7
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end
  if length >= 5 && length <= 8
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end
  if length >= 6
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end
end

DEFAULT_LIST_FILENAME = "db/fixtures/word_list.txt"

File.foreach(DEFAULT_LIST_FILENAME) do |line|
  word = line.strip
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty? && (letters & medium_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5 && length >= 3 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5 && length >= 3 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6 && length >= 3 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7 && length >= 4 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8 && length >= 5 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..350), y: 0, level: 7)
  end

  if length <= 10 && length >= 6 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..300), y: 0, level: 8)
  end

  if length > 10
    default_category.words.create(text: word, points: points, x: rand(25..200), y: 0, level: 9)
  end
end

RUBY_LIST_FILENAME = "db/fixtures/ruby_list.txt"

ruby_file_string = File.read(RUBY_LIST_FILENAME)
ruby_words = ruby_file_string.gsub("\n", " ").split(/\s+/)
ruby_words.each do |word|
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & capitalized_letters).empty? && (letters & numbers).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8
    default_category.words.create(text: word, points: points, x: rand(25..350), y: 0, level: 7)
  end

  if length <= 10
    default_category.words.create(text: word, points: points, x: rand(25..300), y: 0, level: 8)
  end

  if length > 10
    default_category.words.create(text: word, points: points, x: rand(25..200), y: 0, level: 9)
  end
end

JAVASCRIPT_LIST_FILENAME = "db/fixtures/javascript_list.txt"

javascript_file_string = File.read(JAVASCRIPT_LIST_FILENAME)
javascript_words = javascript_file_string.gsub("\n", " ").split(/\s+/)
javascript_words.each do |word|
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty? && (letters & medium_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5 && length >= 3 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5 && length >= 3 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6 && length >= 3 && (letters & capitalized_letters).empty? && (letters & hard_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7 && length >= 4 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8 && length >= 5 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 7)
  end

  if length <= 10 && length >= 6 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 8)
  end

  if length > 10 && (letters & capitalized_letters).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 9)
  end
end

def assign_points(word)
  points = 0

  word.chars.each do |character|
    if easy_letters.include?(character)
      points += 50
    elsif medium_letters.include?(character)
      points += 100
    elsif hard_letters.include?(character)
      points += 150
    elsif capitalized_letters.include?(character)
      points += 200
    elsif numbers.include?(character)
      points += 250
    elsif special_characters?(character)
      points += 300
    end
  end

  points
end

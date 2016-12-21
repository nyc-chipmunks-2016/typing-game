animal_category = Category.create(name: "animals")
default_category = Category.create(name: "default")
ruby_category = Category.create(name: "ruby")

EASY_LETTERS = %w(a s d f g h j k l)
MEDIUM_LETTERS = %w(q w e r t y u i o p)
HARD_LETTERS = %w(z x c v b n m)
CAPITALIZED_LETTERS = ("A".."Z").to_a
NUMBERS = %w(1 2 3 4 5 6 7 8 9 0)
SPECIAL_CHARACTERS = %w(` ! @ # $ % ^ & * ( ) - _ + = { } [ ] | \ " ' : ; / ? < > . ,)

def assign_points(word)
  points = 0

  word.chars.each do |character|
    if EASY_LETTERS.include?(character)
      points += 50
    elsif MEDIUM_LETTERS.include?(character)
      points += 100
    elsif HARD_LETTERS.include?(character)
      points += 150
    elsif CAPITALIZED_LETTERS.include?(character)
      points += 200
    elsif NUMBERS.include?(character)
      points += 250
    elsif SPECIAL_CHARACTERS.include?(character)
      points += 300
    end
  end

  points
end

ANIMAL_LIST_FILENAME = "db/fixtures/animal_list.txt"

File.foreach(ANIMAL_LIST_FILENAME) do |line|
  word = line.strip.downcase
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & HARD_LETTERS).empty?
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5 && length >= 3 && (letters & HARD_LETTERS).empty?
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5 && length >= 3
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6 && length >= 3 && (letters & HARD_LETTERS).empty?
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7 && length >= 4
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8 && length >= 5
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 7)
  end

  if length <= 9 && length >= 6
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 8)
  end

  if length >= 8
    animal_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 9)
  end
end

DEFAULT_LIST_FILENAME = "db/fixtures/common_words_list.txt"

File.foreach(DEFAULT_LIST_FILENAME) do |line|
  word = line.strip
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & HARD_LETTERS).empty? && (letters & MEDIUM_LETTERS).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4 && (letters & HARD_LETTERS).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5 && length >= 2 && (letters & HARD_LETTERS).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5 && length >= 3 && (letters & HARD_LETTERS).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6 && length >= 3 && (letters & HARD_LETTERS).empty?
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7 && length >= 4
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8 && length >= 4
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 7)
  end

  if length <= 10 && length >= 4
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 8)
  end

  if length > 5
    default_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 9)
  end
end

RUBY_LIST_FILENAME = "db/fixtures/ruby_list.txt"

ruby_file_string = File.read(RUBY_LIST_FILENAME)
ruby_words = ruby_file_string.gsub("\n", " ").split(/\s+/).uniq
ruby_words.each do |word|
  length = word.length
  letters = word.chars
  points = assign_points(word)

  if length <= 4 && (letters & CAPITALIZED_LETTERS).empty? && (letters & NUMBERS).empty? && (letters & SPECIAL_CHARACTERS).empty?
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 1)
  end

  if length <= 4 && (letters & CAPITALIZED_LETTERS).empty?
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 2)
  end

  if length <= 5 && (letters & CAPITALIZED_LETTERS).empty? && (letters & NUMBERS).empty?
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 3)
  end

  if length <= 5 && (letters & CAPITALIZED_LETTERS).empty? && (letters & SPECIAL_CHARACTERS).empty?
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 4)
  end

  if length <= 6
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 5)
  end

  if length <= 7
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 6)
  end

  if length <= 8
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 7)
  end

  if length <= 9
    ruby_category.words.create(text: word, points: points, x: rand(25..400), y: 0, level: 8)
  end

  if length >= 10
    ruby_category.words.create(text: word, points: points, x: rand(25..250), y: 0, level: 9)
  end
end

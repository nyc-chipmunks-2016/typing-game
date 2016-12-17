module ApplicationHelper
  def gravatar_for(user, options = { size: 80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "http://www.aspirehire.co.uk/aspirehire-co-uk/_img/profile.svg"
    image_tag(gravatar_url, alt: user.username, class: "img-circle")
  end
end

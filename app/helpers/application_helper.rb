module ApplicationHelper
  def gravatar_for(user, options = { size: 80 })
    gravatar_id = Digest::MD5::hexdigest(user.email.downcase)
    size = options[:size]
    gravatar_url = "https://www.shareicon.net/data/256x256/2016/09/13/828281_game_512x512.png"
    image_tag(gravatar_url, alt: user.username, class: "img-circle")
  end
end

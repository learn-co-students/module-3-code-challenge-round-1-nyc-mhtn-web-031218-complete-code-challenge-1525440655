document.addEventListener('DOMContentLoaded', function() {
  const imageId = 41 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`



  let imageCard = document.getElementById("image_card")

  Adapter.getImages().then(function(json){
      Image.showImage([json])
  })

})

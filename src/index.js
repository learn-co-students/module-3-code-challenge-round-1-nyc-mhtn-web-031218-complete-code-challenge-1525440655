document.addEventListener('DOMContentLoaded', function() {
  const imageId = 40 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(json => {
    let div = document.getElementById('image_card')
    let name = document.getElementById('name')
    let image = document.getElementById('image')
    image.src = `${json.url}`
    name.innerHTML = `${json.name}`
  })

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', function(){
    let likes = document.getElementById('likes')
    likes.innerHTML++
    fetch(`https://randopic.herokuapp.com/likes`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body: JSON.stringify({
          image_id: imageId
         })
       })
  })

  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', function(e){
    e.preventDefault()
    let commentList = document.getElementById('comments')
    let newComment = document.createElement('li')
    newComment.innerHTML = e.target.children[0].value
    commentList.append(newComment)
    fetch(`https://randopic.herokuapp.com/comments`, {
         method: "POST",
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
         },
         body: JSON.stringify({
          image_id: imageId,
          content: e.target.children[0].value
         })
       })
  })


})

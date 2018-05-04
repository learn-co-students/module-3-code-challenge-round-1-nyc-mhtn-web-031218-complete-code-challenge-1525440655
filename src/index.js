document.addEventListener('DOMContentLoaded', function() {
  const imageId = 38 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageTag = document.querySelector('img')
  const commentForm = document.getElementById('comment_form')
  const commentSection = document.getElementById('comments')
  const commentInput = document.getElementById('comment_input')
  const likeButton = document.querySelector('button')

  const currentLikes = parseInt(likes.innerHTML)


  getImages();
  commentForm.addEventListener('submit', createCommentHandler)
  likeButton.addEventListener('click', incrementLikeHandler)

  //Pushes image to page
  function renderImg(imgObj){
    let imgUrl = imgObj["url"]
    imageTag.setAttribute('src', imgUrl)
  }
  //Fetches for the Image
  function getImages(){
    return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(json => renderImg(json))
  }

  //Handles Creating a comment form and fetch posting it
  function createCommentHandler(event){
    event.preventDefault();
    newComment = document.createElement("li")
    let x = newComment.innerText = commentInput.value
    commentSection.append(newComment)
    fetch(`https://randopic.herokuapp.com/comments/${commentId}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 38, content: x})
    })
    .then(res => res.json())
  }


 // like incrementing
  function incrementLikeHandler(event){
    const like = document.getElementById('likes')
    like.innerHTML = currentLikes +1  //++1 gives me the error that its not a #
    fetch(`https://randopic.herokuapp.com/likes`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: 38})
    }).then(res => res.json())
      .then(console.log)
  }

  // const likes = document.getElementById('likes-count')
  // const currentLikes = parseInt(likes.innerText)
  // const likeCounter = {}










})

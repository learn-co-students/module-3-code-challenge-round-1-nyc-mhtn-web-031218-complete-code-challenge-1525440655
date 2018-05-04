document.addEventListener('DOMContentLoaded', function() {
  const imageId = 42 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then (res => res.json())
    .then (json => {
      const showImage = document.createElement('img')
      showImage.setAttribute('src', `${json.url}`)
      document.body.appendChild(showImage)

      const likeButton = document.getElementById('likes')
      const showLikes = document.createElement('p')
      showLikes.setAttribute('id', `${json.id}`)
      showLikes.innerHTML = `${json.like_count}`
      likes.appendChild(showLikes)

      const showComment = document.createElement('ul')
      const newComment = document.createElement('li')
      showComment.setAttribute('id', `comment_${json.id}`)
      const commentArray = json.comments.map(comment => comment.content)
      console.log(commentArray)
      showComment.innerHTML = `<h4>Comments: </h4><li>${commentArray}</li>`
      document.body.appendChild(showComment)
      showComment.appendChild(newComment)
    })

  const likeButton = document.getElementById('like_button')
  likeButton.addEventListener('click', addLike)

  function addLike () {
    const likeCounter = document.getElementById(42)
    likeCounter.innerHTML= parseInt(likeCounter.innerHTML) + 1;
    fetch(`https://randopic.herokuapp.com/likes`, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id:`${imageId}`, like_count: likeCounter.value})
    })
  }

  const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', addComment)

  function addComment (e) {
    e.preventDefault()
    const commentSection = document.querySelector('ul')
    const newComment = document.createElement('li')
    newComment.innerHTML = `<li>${document.getElementById('comment_input').value}</li>`
    commentSection.appendChild(newComment)

    fetch(`https://randopic.herokuapp.com/comments`, {
      method: 'POST',
      headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({image_id:`${imageId}`, content: newComment.innerText})
    })
  }

})

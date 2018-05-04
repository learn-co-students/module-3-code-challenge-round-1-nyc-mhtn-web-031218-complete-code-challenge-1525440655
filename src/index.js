document.addEventListener('DOMContentLoaded', function() {
  const imageId = 26
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageName = document.getElementById('name')
  const imageCard = document.getElementById('image_card')
  const image = document.getElementById('image')

  const likeButton = document.getElementById('like_button')
  const likeNumber = document.getElementById('likes')

  const commentForm = document.getElementById('comment_form')
  const commentList = document.getElementById('comments')
  const commentInput = document.getElementById('comment_input')

   currentImage = null

  // fetch image and set page up
  getImage(imageURL).then((img) => {
    currentImage = new Image(img)

    // get image loaded
    image.setAttribute('src', currentImage.url)

    // get likes loaded
    imageName.innerHTML = currentImage.name
    likeNumber.innerHTML = currentImage.like_count

    // get comments loaded
    img.comments.forEach(comment => {
      loadComment(commentInput, commentList, comment)
    })
  })

  // post like
  likeButton.addEventListener('click', () => {
    likeNumber.innerText = parseInt(likeNumber.innerText) + 1
    addLike(likeURL, imageId).then(console.log)
    currentImage.like_count++
  })

  //post comment
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addComment(commentsURL, imageId, commentInput.value).then((cmt) => {
      new Comment(cmt)
      loadComment(commentInput, commentList, cmt)

    })
  })

  // delete comment
  commentList.addEventListener('click', e => {
    console.log(e.target.id)
    if(e.target.id){
      removeComment(commentsURL + `${e.target.id}`).then(r => {
        Comment.all.splice(Comment.all.indexOf(Comment.all.find( (c) => c.id === parseInt(e.target.id))),1)
        e.target.parentElement.remove()
      })
    }
  })

})

// HELPER FUNCTIONS

function getImage(url) {
  return fetch(url).then(r => r.json())
}

function addLike(url, id) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: id
    })
  }).then(r => r.json())
}

function addComment(url, id, content) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      image_id: id,
      content: content
    }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(r => r.json())
}

function loadComment(commentInput, commentList, cmt){
  let li = document.createElement('li')
  li.setAttribute('data-id', cmt.id)
  li.innerHTML = cmt.content+`<input type="button" id="${cmt.id}" value="x">`
  commentList.append(li)
  commentInput.value = ""
}

function removeComment(url){
  return fetch(url, {method: 'DELETE'}).then(r => r.json())
}

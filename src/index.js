document.addEventListener('DOMContentLoaded', function() {
  const imageId = 32 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(res => res.json())
  .then(json => {
    new Image(json.id, json.name, json.like_count, json.url).render()

    json.comments.forEach(comment => new Comment(comment.id, comment.content, comment.image_id).render())

  })

  function postComment(obj) {
    fetch(`https://randopic.herokuapp.com/comments/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(json => new Comment(json.id, json.content, json.image_id).render())
  }

    function addLikes(obj){
      fetch(`https://randopic.herokuapp.com/likes/`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
      .then(incrementLike())
      // .then(res => res.json())
      // .then(json => console.log(json))
    }

  // Adapter.firstGet()

  const commentForm = document.querySelector('#comment_form')
  const likeBtn = document.querySelector('#like_button')
  const likeCounter = document.querySelector('#likes')

  commentForm.addEventListener('submit', addComment)
  likeBtn.addEventListener('click', addLike)

    function addLike(e){

      let likeObj = {
        image_id: 32
      }
      // Adapter.addLikes(likeObj)
      addLikes(likeObj)
    }

    function incrementLike(){
      let likes = parseInt(likeCounter.innerText)
      let newLike = likes += 1

      // console.log(store.images);
      likeCounter.innerText = newLike
    }

    function addComment(e) {
      e.preventDefault()
      let comment = e.target[0].value
      let imgId = 32

      let obj = {
        content: comment,
        image_id: imgId
      }
      // Adapter.postComment(obj)
      postComment(obj)
    }

})

// A RandoPic user will be able to do the following things:

// As a user, when the page loads I will see an image, any comments that image has, and the number of likes that image has.

// As a user, I can click to like an image, which will increase the number of likes that image has by one.

// As a user I can fill out an input fields and submit the form to add a comment to an image. I should see my new comment below any previous comments.

// As a user, when I refresh the page, any comments or likes I have added should be persisted to the backend API and I should see my changes on the page.

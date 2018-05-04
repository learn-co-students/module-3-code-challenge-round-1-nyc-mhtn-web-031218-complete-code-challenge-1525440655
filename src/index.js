document.addEventListener('DOMContentLoaded', function() {
  const imageId = 33
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // Grab Elements
  let imageCardDiv = document.getElementById('image_card')
  let imageImg = document.getElementById('image')
  let nameH4 = document.getElementById('name')
  let likesSpan = document.getElementById('likes')
  let likeButton = document.getElementById('like_button')
  let commentForm = document.getElementById('comment_form')
  let commentsUl = document.getElementById('comments')

  // STEP 1
  // GET FETCH image
  fetch(imageURL)
  .then(response => response.json())
  .then(json => {

    imageImg.setAttribute('src', json.url)
    nameH4.innerText = json.name
    likesSpan.innerText = json.like_count

    json.comments.forEach((comment)=>{
      let commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentsUl.appendChild(commentLi)
    })
  })


  // STEP 2
  // Adding event listener to like button
  likeButton.addEventListener('click',()=>{
    //For some reason these values could not be grabbed inside this function body, so I am redefining them.
    const imageId = 33
    let currentNumLikes = parseInt(likesSpan.innerText)
    likesSpan.innerText = ++currentNumLikes


    // STEP 3
    // POST FETCH likes
    fetch('https://randopic.herokuapp.com/likes',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })

  })


  // STEP 4
  // Adding event listener to comment submit button
  commentForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    //For some reason these values could not be grabbed inside this function body, so I am redefining them.
    const imageId = 33
    const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
    let commentInput = document.getElementById('comment_input')
    let commentsUl = document.getElementById('comments')

    let newCommentLi = document.createElement('li')
    newCommentLi.innerText = commentInput.value

    commentsUl.appendChild(newCommentLi)


    // STEP 5 POST fetch comments
    let postData = {
      image_id: imageId,
      content: commentInput.value
    }
    fetch('https://randopic.herokuapp.com/comments',{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    })

    // reset field
    commentInput.value = ""

  })

})

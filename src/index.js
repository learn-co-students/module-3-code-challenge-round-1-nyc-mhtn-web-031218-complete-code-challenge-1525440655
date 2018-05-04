document.addEventListener('DOMContentLoaded', function() {
  const imageId = 44 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // get the html elements for the page
  let imageContainer = document.querySelector('img[data-id]')
  let nameContainer = document.getElementById('name')
  let likesContainer = document.getElementById('likes')
  let likesCount = parseInt(likesContainer.innerHTML)
  let likeButton = document.getElementById('like_button')
  let commentForm = document.getElementById('comment_form')
  let commentInput = document.getElementById('comment_input')
  let commentsContainer = document.getElementById('comments')
  // console.log("image", imageContainer);
  // console.log("name", nameContainer);
  // console.log("likes", likesContainer);
  // console.log("likes count", likesCount, typeof likesCount);
  // console.log("like button", likeButton);
  // console.log("comment form", commentForm);
  // console.log("comments", commentsContainer);

  // FETCH THE IMAGE AND DATA
  Image.getImage(imageURL).then(json => {
    console.log(json);
    imageContainer.setAttribute('src', json.url)
    nameContainer.innerText = json.name
    let likesCount = parseInt(likesContainer.innerText = `${json.like_count}`)

    //get the comments and start going through them
    let comments = json.comments.sort((a, b) => a.id - b.id) //this is gross but I want them to sort oldest to newest on bottom. should add this into model
    console.log(comments);

    comments.forEach(comment => {
      //create a comment element
      let commentLi = document.createElement('li')
      commentLi.setAttribute('data-comment-id', comment.id)

      //add it in
      commentLi.innerText = comment.content
      commentsContainer.append(commentLi)

      //create the delete button
      let commentDeleteButton = document.createElement('button')
      commentDeleteButton.innerText = "X"
      commentLi.append(commentDeleteButton)
      commentDeleteButton.addEventListener('click', () => {
        commentsContainer.removeChild(commentLi)
        Comment.deleteComment(comment.id)
      })

    }) // putting comments on the page
  }) // fetch to get the image data

likeButton.addEventListener('click', () => {
  // go back and make this it's own function
  let likesCount = parseInt(likesContainer.innerHTML)
  let updatedLikesCount = likesCount + 1

  likesContainer.innerHTML = `${likesCount + 1}` //come back and refactor this, it's not going to overwrite correctly
  Image.addLike(imageId)
})

commentForm.addEventListener('submit', (e) => {
  e.preventDefault()

  //create the comment
  let commentLi = document.createElement('li')
  let content = commentInput.value
  commentLi.innerText = content
  commentsContainer.append(commentLi)
  commentInput.value = ""

  // I don't have to wait for this to add the comment, but I want to for the delete button
  Comment.addComment(imageId, content)
  .then(response => response.json())
  .then(json => {
    // console.log(json);
    commentLi.setAttribute('data-comment-id', json.id)

    //create the delete button
    let commentDeleteButton = document.createElement('button')
    commentDeleteButton.innerText = "X"
    commentLi.append(commentDeleteButton)
    commentDeleteButton.addEventListener('click', () => {
      commentsContainer.removeChild(commentLi)
      Comment.deleteComment(json.id)
    })
  })
})

}) // dom content loaded

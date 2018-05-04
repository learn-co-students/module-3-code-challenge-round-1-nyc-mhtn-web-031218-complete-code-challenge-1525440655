document.addEventListener('DOMContentLoaded', function() {
  const imageId = 47 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL).then(res => res.json()).then(image => showImage(image))
  // .then(imageJSON => new Image(imageJSON))
  // .then(image => () => { this.showImage() });

  function showImage(image) {
    // console.log(image);
    let img = document.getElementById('image');
    img.src = image.url;

    let imageName = document.getElementById("name");
    imageName.innerText = image.name;

    let likes = document.getElementById('likes');
    likes.innerText = image.like_count;

    let likeButton = document.getElementById('like_button');
    likeButton.addEventListener('click', (e) => {
      let currentLikeCount = image.like_count;
      let newLikeCount = ++currentLikeCount;
      addLike(image)
      likes.innerText = newLikeCount;
      image.like_count = newLikeCount;
    })

    let imageComments = image.comments;
    imageComments.forEach(comment => showComment(comment));

    let commentForm = document.getElementById('comment_form');
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addComment(image)
      commentForm.reset();
    });
  }

  function showComment(comment) {
    let comments = document.getElementById('comments');
    let commentEle = document.createElement('li');
    commentEle.setAttribute('id', `comment-id-${comment.id}`);
    commentEle.innerHTML = `${comment.content}<br>`;
    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('id', `delete-comment-${comment.id}`);
    deleteButton.innerText = "delete";
    commentEle.append(deleteButton);

    deleteButton.addEventListener('click', (e) => {deleteComment(comment)})

    comments.append(commentEle);
  }

  function addLike(image) {
    let body = { image_id: image.id };

    return fetch(likeURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }

  function addComment(image) {
    let comments = document.getElementById('comments');
    let commentEle = document.createElement('li');
    let comment = document.getElementById('comment_input').value;

    let body = {
      image_id: image.id,
      content: comment
    }

    fetch(commentsURL, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(comment => showComment(comment))
  }

  function deleteComment(comment) {
    let commentEle = document.getElementById(`comment-id-${comment.id}`);
    commentEle.remove();

    fetch(`${commentsURL}/${comment.id}`, { method: 'DELETE' });
  }
})

document.addEventListener('DOMContentLoaded', function() {
  getImage();
  const imageId = 31
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let main = document.getElementsByClassName('container')
  let imageCard = document.getElementById('image_card')
  let likeButton = document.getElementById('like_button')

  likeButton.addEventListener('click', function(e) {
    e.preventDefault()
    let likeCounter = document.getElementById('likes')
    let newLikes = likeCounter.innerText++
      let imageId = image.attributes[1].value.slice(0, -1)

    fetch("https://randopic.herokuapp.com/likes", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          like_count: newLikes
        })
      })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data)
        //only doing this console.log to confirm post was made (I know this is not required.)
      })
  })

  let submit = document.getElementById('submit')
  submit.addEventListener('click', function(e) {
    e.preventDefault()
    let input = document.getElementById("comment_input")
    let value = input.value
    let comments = document.getElementById("comments")
    let li = document.createElement('li')
    li.innerText = value
    comments.append(li)
    input.value = ""

    fetch("https://randopic.herokuapp.com/comments", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: value
        })
      })
      .then(resp => resp.json())
      .then(function(data) {
        console.log(data)
        //only doing this console.log to confirm post was made (I know this is not required.)
      })
  })

  function getImage() {
    let thisImage = document.getElementById('image')
    fetch("https://randopic.herokuapp.com/images/31")
      .then(resp => resp.json())
      .then(function(data) {
        thisImage.setAttribute('src', data.url)
        console.log(imageCard.children[1].innerText = data.name)
      })
  }



})
//Looks like everything is working on the backend - I think it's what you want - not sure - please don't fail me. This is what I am seeing:
// {
// id: 31,
// url: "http://blog.flatironschool.com/wp-content/uploads/2016/07/072716-js-saved-web-4-352x200.jpg",
// name: "The Internet!",
// like_count: 21,
// comments: [
// {
// id: 5961,
// content: "asdfasdf",
// image_id: 31,
// created_at: "2018-05-04T14:52:54.998Z",
// updated_at: "2018-05-04T14:52:54.998Z",
// },
// {
// id: 5964,
// content: "this is a dumb test",
// image_id: 31,
// created_at: "2018-05-04T14:53:12.862Z",
// updated_at: "2018-05-04T14:53:12.862Z",
// },
// {
// id: 5949,
// content: "adfasdf",
// image_id: 31,
// created_at: "2018-05-04T14:50:59.414Z",
// updated_at: "2018-05-04T14:50:59.414Z",
// },
// {
// id: 5952,
// content: "adasdf",
// image_id: 31,
// created_at: "2018-05-04T14:51:08.116Z",
// updated_at: "2018-05-04T14:51:08.116Z",
// },
// {
// id: 5951,
// content: "",
// image_id: 31,
// created_at: "2018-05-04T14:51:04.732Z",
// updated_at: "2018-05-04T14:51:04.732Z",
// },
// {
// id: 5733,
// content: "first comment!",
// image_id: 31,
// created_at: "2018-05-04T12:08:22.982Z",
// updated_at: "2018-05-04T12:08:22.982Z",
// },
// ],
// }

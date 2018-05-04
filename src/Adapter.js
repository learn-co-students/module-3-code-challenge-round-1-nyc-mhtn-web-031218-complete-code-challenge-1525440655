const imageId = 32
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

class Adapter {

  static firstGet(){
    return fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(res => res.json())
    .then(json => {
      new Image(json.id, json.name, json.like_count, json.url).render()

      json.comments.forEach(comment => new Comment(comment.id, comment.content, comment.image_id).render())

    })
  }

  static postComment(obj) {
    return fetch(`https://randopic.herokuapp.com/comments/`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(json => new Comment(json.id, json.content, json.image_id).render())
  }

    static addLikes(obj){
      return fetch(`https://randopic.herokuapp.com/likes/`, {
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
}

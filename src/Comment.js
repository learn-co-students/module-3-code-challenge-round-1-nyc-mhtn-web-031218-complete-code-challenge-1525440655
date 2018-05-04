class Comment {

  static addComment (imageId, text) {
    //console.log(imageId, comment);
    let commentObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: text
      })
    }
    return fetch('https://randopic.herokuapp.com/comments', commentObj)
  }

  static deleteComment (commentId) {
    let commentObj = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    return fetch(`https://randopic.herokuapp.com/comments/${commentId}`, commentObj)
  }

}

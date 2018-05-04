class Comment {
  constructor(id, content, imageId){
    this.id = id
    this.content = content
    this.imageId = imageId

    store.comments.push(this)
  }

  render(){
    const commentList = document.querySelector('#comments')
    const comment = document.createElement('li')
      comment.innerText = `${this.content}`
      comment.id = `${this.id}`

    commentList.append(comment)
  }
}

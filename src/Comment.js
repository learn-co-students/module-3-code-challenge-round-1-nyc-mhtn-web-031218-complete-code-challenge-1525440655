class Comment {
  constructor(data){
    this.content = data.content
    this.id = data.id
    this.image_id = data.image_id
    Comment.all.push(this)
  }
}
Comment.all = []

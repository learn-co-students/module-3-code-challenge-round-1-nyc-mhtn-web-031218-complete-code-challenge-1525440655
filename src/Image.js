class Image {
  constructor(data){
    this.id = data.id
    this.url = data.url
    this.like_count = data.like_count
    this.name = data.name
    Image.all.push(this)
  }

}
Image.all = []

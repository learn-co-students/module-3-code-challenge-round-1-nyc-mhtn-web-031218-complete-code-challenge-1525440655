const store = {
  images: [],
  comments: []
}

class Image {

  constructor(id, name, likes, url){
    this.id = id
    this.name = name
    this.likes = likes
    this.url = url

    store.images.push(this)
  }

  render(){
    console.log(store);
    const img = document.querySelector('#image')
      img.src = `${this.url}`

    const imgName = document.querySelector('#name')
      imgName.innerText = `${this.name}`

    const imgLikes = document.querySelector('#likes')
      imgLikes.innerText = `${this.likes}`
  }

}

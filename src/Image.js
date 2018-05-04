class Image {

  // static getLikeCount () {
  //   let likesCount = parseInt(likesContainer.innerHTML)
  // }
  //
  // static setLikeCount () {
  //   likesContainer.innerHTML = this.getLikesCount() + 1
  // }

  static getImage(imageURL) {
    //console.log("I'm in the fetch");
    return fetch(imageURL).then(response => response.json())
  }

  static addLike (imageId) {
    let likeObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    }
    fetch('https://randopic.herokuapp.com/likes', likeObj)
  }

}

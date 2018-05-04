class Adapter{

  static getImages(){
    return fetch(`https://randopic.herokuapp.com/images/`)
    .then(res => res.json())
  }

  static increaseLikes(imageId){
    return fetch(`https://randopic.herokuapp.com/likes`, {
      method: "POST",
      body:{
        image_id: imageId
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json(imageId))
  }

  static saveComments(id, comment){
    return fetch('https://randopic.herokuapp.com/comments',{
      method: "POST",
      body:{
        image_id: imageId,
        content: comment,
      },
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res=> res.json(id, comment))
  }
}

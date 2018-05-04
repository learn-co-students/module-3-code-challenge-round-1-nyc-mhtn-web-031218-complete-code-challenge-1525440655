class Image {

  constructor(data){
    this.id = data.idea
    this.url = data.url
    this.name = data.name
    this.like_count = data.like_count
    this.comments = data.comments
    Image.all.push(this)
  }


  static showImage(json){
    json.forEach(function(element){
      let name = document.getElementById("name")
        name.innerText = element.name

       let imagePlace = document.getElementById("image")
       imagePlace.src = element.url
      imagePlace.innerHTML += '<img src="'+element.url+'" ></img>';



      let likeButton = document.getElementById("like_button")

        likeButton.addEventListener("click", function(e){

              let likesCounter = document.getElementById("likes")
              likesCounter.innerText =+1
              Adapter.increaseLikes(element.id)
        })

          let button = document.getElementById("button")
          let commentForm = document.getElementById("comment_form")
          button.addEventListener("click", function(e){

                let comments = document.getElementById("comments")
                let comment = document.createElement("li")
                comment.setAttribute("id", "comment")
                let commentInput = document.getElementById("comment_input").value

                    comments.append("commentInput")

                    Adapter.saveComments(element.id, element.comment)

          })

    })
  }
}

Image.all = []

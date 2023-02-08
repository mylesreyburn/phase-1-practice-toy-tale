let addToy = false;



document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  // const addToyButton = document.querySelector("input.submit");

  addToyForm = document.querySelector("form")
  addToyForm.addEventListener("submit", submitToyForm);

  initializeBoxes();

  
});
  

function submitToyForm(event){
  
  event.preventDefault();

  let newToyName =  event.target.name.value;
  let newToyImage = event.target.image.value;

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": newToyName,
      "image": newToyImage,
      "likes": 0
    })})
    .then(response => response.json())
    .then(function (data){
      console.log(data)
      let toyCollection = document.getElementById("toy-collection")
      let toyDiv = document.createElement("div");
      let toyName = document.createElement("h2");
      let toyImg = document.createElement("img");
      let toyLikes = document.createElement("p");
      let likeButton = document.createElement("button");
      let currentId = data.id
      let currentLikes = data.likes

      toyDiv.className = "card";
      toyName.textContent = data.name;
      toyImg.src = data.image;
      toyLikes.textContent = `${currentLikes} Likes`;
      likeButton.textContent = "Like ❤️";
      likeButton.addEventListener("click", () => {
        console.log(currentId)

        fetch(`http://localhost:3000/toys/${currentId}`, {
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": currentLikes += 1
          })
      })
      toyLikes.textContent = `${currentLikes} Likes`
    })
      
      toyCollection.appendChild(toyDiv);
      toyDiv.appendChild(toyName);
      toyDiv.appendChild(toyImg);
      toyDiv.appendChild(toyLikes);
      toyDiv.appendChild(likeButton);
      
    })
    
  

  
}

function initializeBoxes(){
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then((data) => initializeBox(data))}


function initializeBox(data){
  console.log(data)
    for(item in data){
      console.log(data[item].id)
      let toyCollection = document.getElementById("toy-collection")
      let toyDiv = document.createElement("div");
      let toyName = document.createElement("h2");
      let toyImg = document.createElement("img");
      let toyLikes = document.createElement("p");
      let likeButton = document.createElement("button");
      let currentId = data[item].id
      let currentLikes = data[item].likes
      

      toyDiv.className = "card";
      toyName.textContent = data[item].name;
      toyImg.src = data[item].image;
      toyLikes.textContent = `${currentLikes} Likes`;
      likeButton.textContent = "Like ❤️";
      likeButton.addEventListener("click", () => {
        console.log(currentId)

        fetch(`http://localhost:3000/toys/${currentId}`, {
          method: "PATCH",
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "likes": currentLikes += 1
          })
      })
      toyLikes.textContent = `${currentLikes} Likes`
    })
      
      toyCollection.appendChild(toyDiv);
      toyDiv.appendChild(toyName);
      toyDiv.appendChild(toyImg);
      toyDiv.appendChild(toyLikes);
      toyDiv.appendChild(likeButton);
      
    }
}

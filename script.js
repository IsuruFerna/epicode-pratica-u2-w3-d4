const myQ = "cats";
const myQ2 = "dogs";
const btnLoadImages = document.getElementById("load-imgs");
const btnLoadImages2 = document.getElementById("load-imgs-2");

// render each img
const imgContainer = document.getElementById("img-container_");
const loadImages = function (images) {
   images.photos.forEach((photo) => {
      const col = document.createElement("div");
      col.innerHTML = `
        <div class="col">
          <div class="card" style="width: 18rem">
              <a href="./img-details.html?photoId=${photo.id}"><img src="${photo.src.small}" class="card-img-top" alt="${photo.alt}" /></a>
              <div class="card-body">
                <h5 class="card-title">${photo.alt}</h5>
                <p class="card-text">
                  ID: ${photo.id}
                </p>
                <button onClick="hide(event)" class="btn btn-warning">Hide</button>
              </div>
          </div>
        </div>
        `;
      imgContainer.appendChild(col);
   });
};

// fetch data
const dataFetch = function (query) {
   fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
         Authorization:
            "TImJJd8ujpd8NYa27ymrH1Txlh40fScHnotI4aoRLaEStwPnEsWlEtB5",
      },
   })
      .then((response) => {
         if (!response.ok) {
            throw new Error("Fetch Error!", response);
         }
         return response.json();
      })
      .then((data) => {
         console.log("Fetch fine", data);
         loadImages(data);
      })
      .catch((err) => console.log("Fetch error-catch!", err));
};

// hide the clicked img
const hide = function (e) {
   const parent = e.target.closest(".col").parentElement;
   parent.style.display = "none";
};

// load images when click
btnLoadImages.addEventListener("click", function () {
   dataFetch(myQ);
});
btnLoadImages2.addEventListener("click", function () {
   dataFetch(myQ2);
});

// search
// clear what inside the div and reload with new data
const formSearch = document.getElementById("search");
formSearch.addEventListener("submit", function (e) {
   e.preventDefault();
   const value = formSearch.querySelector("input").value;
   imgContainer.innerHTML = "";
   dataFetch(value);
});

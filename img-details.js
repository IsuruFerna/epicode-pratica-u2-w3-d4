const addressbarContent = new URLSearchParams(location.search);
const photoId = addressbarContent.get("photoId");

const loadPhoto = function (photo) {
   const photoDetails = document.getElementById("img-details_");
   photoDetails.innerHTML = `
  <div class="card mb-3">
    <img src="${photo.src.landscape}" class="card-img-top" alt="${photo.alt}">
    <div class="card-body">
      <h5 class="card-title">${photo.alt}</h5>
      <p class="card-text">Photographer: <a href="${photo.photographer_url}">${photo.photographer}</a></p>
      <p class="card-text"><small class="text-body-secondary"></small></p>
    </div>
  </div>
  `;
   console.log(photo.src.landscape);
};

const dataFetch = function (query) {
   fetch(`https://api.pexels.com/v1/photos/${query}`, {
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
         loadPhoto(data);
      })
      .catch((err) => console.log("Fetch error-catch!", err));
};

dataFetch(photoId);

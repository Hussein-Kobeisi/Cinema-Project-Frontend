const movieCardTemplate = document.getElementById("movieCardTemplate");
const showingContainer = document.getElementById("showingContainer");
const comingContainer = document.getElementById("comingContainer");


for (let i = 0; i < 10; i++) {
  card = movieCardTemplate.cloneNode(true);
  card.style.display = "block";
  showingContainer.appendChild(card);
}

for (let i = 0; i < 10; i++) {
  card = movieCardTemplate.cloneNode(true);
  card.style.display = "block";
  comingContainer.appendChild(card);
}
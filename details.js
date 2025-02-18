/**
 * Henter favoritdestinationer fra Local Storage eller initialiserer en tom liste.
 * @type {Array<string>}
 */
let favorites = readFromLocalStorage("favorites") || [];

/**
 * Event listener til DOMContentLoaded, der henter og viser destinationsdata.
 */
document.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
        // Henter kun den specifikke destination
        fetch(`data/${id}.json`)
            .then(response => response.json())
            .then(data => displaySingleDestination(data))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    }
});

/**
 * Viser en enkelt destination på siden.
 * @param {Object} destination - Destinationsobjekt med detaljer.
 */
function displaySingleDestination(destination) {
    const container = document.getElementById("destination-list");
    container.innerHTML = "";

    // Hent favoritter fra localStorage igen for at sikre opdateret liste
    let favorites = readFromLocalStorage("favorites") || [];

    const facilitiesList = destination.facilities
        .map(facility => `<li>${facility}</li>`)
        .join("");

    const item = document.createElement("div");
    item.classList.add("box");

    // Tjek om denne destination er en favorit
    const isFavorite = favorites.includes(destination.id.toString());

    item.innerHTML = `
        <div class="image_box">
            <img src="img/${destination.image}" alt="${destination.name}" class="destination-img">
            <button class="card__favoritebtn ${isFavorite ? "card__favoritebtn--selected" : ""}" data-favid="${destination.id}">
                <i class="fa-solid fa-heart"></i> FAVORIT
            </button>
        </div>
        
        <div class="content">
            <h3>${destination.destination}</h3>
            <h1>${destination.title}</h1>
            <h4>${destination.subtitle}</h4>
            <p>${destination.text}</p>
            <p class="liste_overskrift">Faciliteter</p>
            <ul>${facilitiesList}</ul>
        </div>
    `;
    container.appendChild(item);

    // Event listener til favoritknappen
    const favButton = item.querySelector(".card__favoritebtn");
    favButton.addEventListener("click", function() {
        let currentId = favButton.dataset.favid;
        let favorites = readFromLocalStorage("favorites") || [];

        if (favorites.includes(currentId)) {
            favorites = favorites.filter(id => id != currentId);
            favButton.classList.remove("card__favoritebtn--selected");
        } else {
            favorites.push(currentId);
            favButton.classList.add("card__favoritebtn--selected");
        }

        // Gem opdaterede favoritter i localStorage
        saveToLocalStorage("favorites", favorites);
    });
}

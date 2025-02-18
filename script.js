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
        // Henter detaljer om en specifik destination
        fetch(`data/${id}.json`)
            .then(response => response.json())
            .then(data => displayDestinationDetails(data))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    } else {
        // Henter og viser liste over alle destinationer
        fetch("data/destinations.json")
            .then(response => response.json())
            .then(data => displayDestinationList(data.destinations))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    }
});

/**
 * Viser en liste over destinationer på siden.
 * @param {Array<Object>} destinations - En liste over destinationer.
 */
function displayDestinationList(destinations) {
    const container = document.getElementById("destination-list");
    container.innerHTML = "";

    destinations.forEach(dest => {
        const item = document.createElement("div");
        item.classList.add("box");
        item.innerHTML = `
            <img src="img/${dest.image}" alt="${dest.name}" class="destination-img">
            <div class="content">
                <button class="card__favoritebtn ${favorites.includes(dest.id.toString()) ? "card__favoritebtn--selected" : ""}" data-favid="${dest.id}">
                    <i class="fa-solid fa-heart"></i>
                </button>
                <a href="destination.html?id=${dest.id}" class="details-link">MORE</a>
            </div>
        `;
        container.appendChild(item);
    });

    // Tilføjer event listeners til favoritknapper
    document.querySelectorAll(".card__favoritebtn").forEach(button => {
        button.addEventListener("click", function(event) {
            let btn = event.target.closest("button");
            let currentId = btn.dataset.favid;

            if (favorites.includes(currentId)) {
                // Fjerner fra favoritter
                favorites = favorites.filter(id => id != currentId);
                btn.classList.remove("card__favoritebtn--selected");
            } else {
                // Tilføjer til favoritter
                favorites.push(currentId);
                btn.classList.add("card__favoritebtn--selected");
            }

            saveToLocalStorage("favorites", favorites);
        });
    });
}






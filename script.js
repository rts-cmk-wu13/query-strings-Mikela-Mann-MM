let favorites =  readFromLocalStorage("favorites") || []



document.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
        fetch(`data/${id}.json`)
            .then(response => response.json())
            .then(data => displayDestinationDetails(data))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    } else {
        fetch("data/destinations.json")
            .then(response => response.json())
            .then(data => displayDestinationList(data.destinations))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    }
});

function displayDestinationList(destinations) {
    const container = document.getElementById("destination-list");
    container.innerHTML = "";

    destinations.forEach(dest => {
        const item = document.createElement("div");
        item.classList.add("box");
        item.innerHTML = `
            <img src="img/${dest.image}" alt="${dest.name}" class="destination-img">
            <div class="content">
            <button class="card__favoritebtn ${favorites.includes(dest.id.toString()) ? "card__favoritebtn--selected" : ""}" data-favid="${dest.id}"><i class="fa-solid fa-heart"></i></button>
                <a href="destination.html?id=${dest.id}" class="details-link">MORE</a>
            </div>
        `;
        container.appendChild(".card__favoritebtn").forEach(function(button){

            button.addEventListener("click", function(event) {
                let currentId = event.target.closest("button").dataset.favid;
                if (favorites.includes(currentId)) {
                    let newFavorites = favorites.filter(id => id != currentId)
                    favorites = newFavorites
                    event.target.classList.remove("card__favoritebtn--selected")
                } else {
                    favorites.push(currentId)
                    event.target.classList.add("card__favoritebtn--selected")
                }
                saveToLocalStorage("favorites", favorites)
            })
        })
        
        
    });

    container.querySelector()

}




function displayDestinationDetails(destination) {
    const container = document.getElementById("destination-list");
    container.innerHTML = `
        <h1>${destination.name}</h1>
        <img src="img/${destination.image}" alt="${destination.name}" class="destination-img">
        <p>${destination.description}</p>
        <a href="index.html">Tilbage til listen</a>
    `;
}





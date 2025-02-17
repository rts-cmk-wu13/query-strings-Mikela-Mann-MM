document.addEventListener("DOMContentLoaded", () => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id) {
        // Henter kun den specifikke destination
        fetch(`data/${id}.json`)
            .then(response => response.json())
            .then(data => displaySingleDestination(data))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    } else {
        // Henter alle destinationer, hvis ingen ID er angivet
        fetch("data/destinations.json")
            .then(response => response.json())
            .then(data => displayDestinationList(data.destinations))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    }
});

function displaySingleDestination(destination) {
    const container = document.getElementById("destination-list");
    container.innerHTML = ""; 

    const facilitiesList = destination.facilities
        .map(facility => `<li>${facility}</li>`)
        .join(""); // Fjerner kommaer fra array'et

    const item = document.createElement("div");
    item.classList.add("box");
    item.innerHTML = `
        <div class="image_box">
        <img src="img/${destination.image}" alt="${destination.name}" class="destination-img">
        <i class="fa-solid fa-heart"><p>FAVORIT</p></i>
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
}


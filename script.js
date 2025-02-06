document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
        // Hvis der er et ID i URL'en, vis detaljevisning
        fetch(`data/${id}.json`)
            .then(response => response.json())
            .then(data => displayDestinationDetails(data))
            .catch(error => console.error("Fejl ved hentning af data:", error));
    } else {
        // Ellers vis listevisning
        fetch("data/destinations.json")
        .then(response => response.json())
        .then(data => displayDestinationList(data.destinations)) // Tilføj .destinations
        .catch(error => console.error("Fejl ved hentning af data:", error));
     
    }
});

function displayDestinationList(destinations) {
    const container = document.getElementById("destination-list");
    container.innerHTML = "";

    destinations.forEach(dest => {
        const item = document.createElement("div");
        item.classList.add("destination-item");
        item.innerHTML = `
            <img src="img/${dest.image}" alt="${dest.name}" class="destination-img">
            <h2>${dest.name}</h2>
            <p>${dest.shortDescription}</p>
            <a href="destination.html?id=${dest.id}" class="details-link">Se mere</a>
        `;
        container.appendChild(item);
    });
}

function displayDestinationDetails(destination) {
    const container = document.getElementById("destination-details");
    container.innerHTML = `
        <h1>${destination.name}</h1>
        <img src="img/${destination.image}" alt="${destination.name}" class="destination-img">
        <p>${destination.description}</p>
        <a href="index.html">Tilbage til listen</a>
    `;
}

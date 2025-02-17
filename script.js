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

        populateApartments();
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
                <p>${dest.shortDescription}<i class="fa-regular fa-heart"></i></p>
                <a href="destination.html?id=${dest.id}" class="details-link">MORE</a>
            </div>
        `;
        container.appendChild(item);
    });
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

function populateApartments() {
    const grid = document.getElementById("apartment-grid");
    grid.innerHTML = "";

    const apartments = [
        { image: "img/apartment1.jpg", title: "Apartment 1" },
        { image: "img/apartment2.jpg", title: "Apartment 2" },
        { image: "img/apartment3.jpg", title: "Apartment 3" },
        { image: "img/apartment4.jpg", title: "Apartment 4" }
    ];

    apartments.forEach(apartment => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.innerHTML = `
            <img src="${apartment.image}" alt="${apartment.title}" class="apartment-img">
            <div class="content">
                <p>${apartment.title}</p>
            </div>
        `;
        grid.appendChild(box);
    });
}
//get list of countries in favorites
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const favoriteList = document.getElementById("favorite-list");
    favoriteList.innerHTML = ""; // Limpiar la lista de favoritos antes de mostrar los nuevos datos

    favorites.forEach(favorite => {
        const favoriteItem = document.createElement("div");
        favoriteItem.classList.add("favorite");

        // Aquí puedes construir la estructura HTML para mostrar cada elemento favorito
        favoriteItem.innerHTML = `
            <h3>${favorite.name}</h3>
            <p>Location: ${favorite.location}</p>
            <p><img src="${favorite.image}" alt="${favorite.name}"></p>
            <!-- Agrega más información si es necesario -->
        `;

        favoriteList.appendChild(favoriteItem);
    });
});


loadHeaderFooter();



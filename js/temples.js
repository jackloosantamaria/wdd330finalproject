import { loadHeaderFooter } from "./utils.mjs";
import { getWeather } from "./loadData.mjs";



document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    console.log(params);
    const country = params.get("country");
     

    if (country) {
        document.getElementById("country-title").textContent = `Temples in ${capitalizeFirstLetter(country)}`;
        console.log(country);
        loadTemplesData(country);
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


async function loadTemplesData(country) {
    
    try {

        const response = await fetch(`../json/north-america.json`);
        const data = await response.json();
        const templeList = document.getElementById("temple-list");
        templeList.innerHTML = ""; // Clear previous temples

        const templesInCountry = data.temples.filter(temple => temple.location === country);
        console.log(templesInCountry);

        for (const temple of templesInCountry) {
            const weatherData = await getWeather(temple.lat, temple.lon);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const templeItem = document.createElement("div");
            templeItem.classList.add("temple");

            if (temple.image !== "#") {
                templeItem.innerHTML = `
                    <img src="${temple.image}" alt="${temple.name}">
                    <h3>${temple.name}</h3>
                    <p>Location: ${temple.location}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherDescription}" class="weather-icon"> ${weatherDescription}</p>
                    <button class="favorite-button" data-temple='${JSON.stringify(temple)}'>Add to Favorites</button>
                `;
            } else {
                templeItem.innerHTML = `
                    <h3>${temple.name}</h3>
                    <p>Location: ${temple.location}</p>
                    <p>Image not available</p>
                `;
            }

            templeList.appendChild(templeItem);
        }
        templeList.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', () => {
                const templeData = JSON.parse(button.getAttribute('data-temple'));
                addToFavorites(templeData);
            });
        });
    } catch (error) {
        console.error("Error fetching the JSON file: ", error);
    }
}

function addToFavorites(templeData) {
    console.log("Adding to favorites:", templeData);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.name === templeData.name)) {
        favorites.push(templeData);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log("Favorites updated:", favorites);
    }

}

loadHeaderFooter();
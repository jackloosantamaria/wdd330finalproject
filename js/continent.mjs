import { loadContinentData } from "./loadData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const continent = params.get("continent") || "north-america"; // Default to North America
    document.getElementById("continent-title").textContent = `Temples in ${capitalizeFirstLetter(continent.replace("-", " "))}`;
    loadContinentData(continent);

    const countryLinks = document.querySelectorAll('#country-list .country');
    countryLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const country = this.querySelector('h2').textContent.trim().toLowerCase();
            window.location.href = `../temples/temples.html?country=${country}`;
        });
    });


});


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



loadHeaderFooter();


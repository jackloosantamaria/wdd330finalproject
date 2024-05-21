document.addEventListener("DOMContentLoaded", function(){
    fetch("../json/north-america.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            const countryList = document.getElementById("country-list");

            data.countries.forEach(country =>{
                const countryDiv = document.createElement("li");
                countryDiv.classList.add("country");

                //populate div with country's data
                countryDiv.innerHTML = `
                    <img src="${country.image}" alt="${country.name} flag">
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Language: ${country.language}</p>
                `;

                //adding country div to container
                countryList.appendChild(countryDiv);
            });
        })
        .catch(error => {
            console.error("Error fetching the JSON file: ", error);
        });
});
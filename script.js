// A toi de jouer pour cette partie :-) Happy coding !

// VARIABLES
const button = document.querySelector("button");
const inputCity = document.querySelector("#cityInput");
const outputCity = document.querySelector("#city");
const outputGps = document.querySelector("#gps");
const outputTemp = document.querySelector("#temperature");
const outputDetails = document.querySelector("#details");


async function fetchCoordinates(query) {
	const response = await fetch (`https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&limit=1`);
	const data = await response.json();
	return data;
	}
  

async function showCity(data){
	outputCity.innerHTML = "";
	const cityResult = await fetchCoordinates(inputCity.value);
	const latitude = cityResult[0].lat;
	const longitude = cityResult[0].lon;
	outputCity.innerText = `${cityResult[0].address.city}`;
	outputGps.innerText = (`${latitude}, ${longitude}`);

	//console.log("🐸 ville : ", cityResult);
	return {latitude: latitude, longitude: longitude};
}

button.addEventListener("click", showCity, fetchWeather);


async function fetchWeather(latitude, longitude){
	console.log("hola");
	const latitudeWeather = await showCity(latitude);
	const longitudeWeather = await showCity(longitude);
	const response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${latitudeWeather}&longitude=${longitudeWeather}&current=temperature_2m,precipitation,relative_humidity_2m`);
	const data = await response.json();
	outputTemp.innerText = `${data.current.temperature_2m}°C`;
	outputDetails.innerText = `Précipitations :${data.current.precipitation} Humidité :${data.current.relative_humidity_2m}`
	//console.log("météo :", data);
	return data;
	}
	fetchWeather();
	


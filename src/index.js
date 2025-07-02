import "./styles.css";
import { getWeatherPromise, getDateString, getCurrentTemperature, getMaxTemperature, getMinTemperature, getCurrentCondition, getCurrentIcon} from "./info.js";
import { updateMainCard, updateForecastCards } from "./dom.js";

const form = document.getElementById("weather-form");
const body = document.querySelector("body");
if(!localStorage.getItem("city")) {
    localStorage.setItem("city", "Toronto"); // Default city
}
form.addEventListener("submit", function(event) {
    event.preventDefault();
    getWeatherPromise(document.getElementById("city").value, "metric").then(data => {
        localStorage.setItem("city", document.getElementById("city").value); // Save city to localStorage
        updateMainCard(data);
        updateForecastCards(data);
    }).catch(error => {
        console.error("Error fetching weather data:", error);
    });
});

window.addEventListener("load", function() {
    const city = localStorage.getItem("city") || "Toronto"; // Default to Toronto if no city is stored
    getWeatherPromise(city, "metric").then(data => {
        updateMainCard(data);
        updateForecastCards(data);
    }).catch(error => {
        console.error("Error fetching weather data on load:", error);
    });
});
//body.innerHTML = `<img src="${getWeatherIcon(getCurrentIcon(data))}" alt="Weather Icon" class="weather-icon">`;
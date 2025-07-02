import "./styles.css";
import { getWeatherPromise, getDateString, getCurrentTemperature, getMaxTemperature, getMinTemperature, getCurrentCondition, getCurrentIcon} from "./info.js";
import { updateMainCard, updateForecastCards } from "./dom.js";

const form = document.getElementById("weather-form");
const body = document.querySelector("body");
form.addEventListener("submit", function(event) {
    event.preventDefault();
    getWeatherPromise(document.getElementById("city").value, "metric").then(data => {
        updateMainCard(data);
        updateForecastCards(data);
    }).catch(error => {
        console.error("Error fetching weather data:", error);
    });
});

//body.innerHTML = `<img src="${getWeatherIcon(getCurrentIcon(data))}" alt="Weather Icon" class="weather-icon">`;
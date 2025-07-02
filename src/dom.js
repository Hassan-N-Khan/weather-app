import "./styles.css";
import {getCityName, getDateString, getWeekdayString, getCurrentTemperature, getMaxTemperature, getMinTemperature, getCurrentCondition, getCurrentIcon, getForecastIcon } from "./info.js";
import { getWeatherIcon } from "./iconMapping.js";

//Main Card
function updateMainCard(data) {
    const mainCard = document.getElementById("main-card");
    mainCard.innerHTML = ""; // Clear previous content

    const cityName = document.createElement("h1");
    cityName.id = "city";
    cityName.textContent = getCityName(data);

    const date = document.createElement("p");
    date.id = "date";
    date.textContent = getDateString(data.days[0].datetime);

    //main-weather card
    const mainWeatherCard = document.createElement("div");
    mainWeatherCard.id = "main-weather";

    const currentTemp = document.createElement("p");
    currentTemp.id = "current-temp";
    currentTemp.textContent = `${getCurrentTemperature(data)}°C`;

    const currentCondition = document.createElement("p");
    currentCondition.id = "current-condition";
    currentCondition.textContent = getCurrentCondition(data);

    const currentIcon = getCurrentIcon(data);

    if (!currentIcon) {
        console.warn("Current weather icon not available yet.");
        return; // Exit early, don't update the card
    }


    const weatherIcon = document.createElement("img");
    weatherIcon.id = "main-weather-icon";
    weatherIcon.src = getWeatherIcon(currentIcon);
    weatherIcon.alt = "Weather Icon";

    //appending main weather card
    mainWeatherCard.appendChild(currentTemp);
    mainWeatherCard.appendChild(currentCondition);
    mainWeatherCard.appendChild(weatherIcon);

    //appending main card
    mainCard.appendChild(cityName);
    mainCard.appendChild(date);
    mainCard.appendChild(mainWeatherCard);
}

//Forecast Cards
function updateForecastCards(data) {
    const forecastContainer = document.querySelector("#forecast");
    forecastContainer.innerHTML = ""; // Clear previous content

    data.days.forEach((day, index) => {
        if (index === 0) return; // Skip the first day as it's already shown in the main card

        const forecastCard = document.createElement("div");
        forecastCard.className = "forecast-card";

        const dayName = document.createElement("h2");
        dayName.textContent = getWeekdayString(getDateString(day.datetime));

        const temperature = document.createElement("p");
        temperature.textContent = `${getMaxTemperature(data, index)}°C / ${getMinTemperature(data, index)}°C`;


        const iconImage = getForecastIcon(data, index);

        if (!iconImage) {
            console.warn("Icon not available yet, will retry...");
            setTimeout(() => updateMainCard(data), 300); // ⏱ Retry in 300ms
            return;
        }

        const iconPath = getWeatherIcon(iconImage);
        if (!iconPath) {
            console.warn("Icon path not found for:", iconImage);
            return;
        }

        const icon = document.createElement("img");
        icon.src = iconPath;
        icon.alt = "Weather Icon";

        forecastCard.appendChild(dayName);
        forecastCard.appendChild(temperature);
        forecastCard.appendChild(icon);

        forecastContainer.appendChild(forecastCard);

        const mainCard = document.getElementById("main-card");
        if (mainCard) {
            mainCard.insertAdjacentElement('afterend', forecastContainer);
        }
    });
}

export { updateMainCard, updateForecastCards };
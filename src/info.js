const apiKey = process.env.API_KEY;

async function getWeatherPromise(city, unitGroup) {
    if (!city) {
        alert("Please enter a city name.");
        throw new Error("City name is required.");
    }

    const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+city+'/next6days?unitGroup='+unitGroup+'&key='+apiKey, {mode: 'cors'});
    if (!response.ok) {
        alert("Error fetching weather data. Please try again.");
        throw new Error("Network response was not ok");
    }

    const data = await response.json();
    if (data.error) {
        alert("Error: " + data.error);
        throw new Error(data.error);
    }

    return data;

}

function getDateString(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Intl.DateTimeFormat(undefined, options).format(new Date(date));
}

function getCurrentTemperature(data) {
    if (!data || !data.currentConditions || !data.currentConditions.temp) {
        throw new Error("Invalid weather data");
    }
    return data.currentConditions.temp;
}

function getMaxTemperature(data,dayIndex) {
    if (!data || !data.days || !data.days[dayIndex] || !data.days[dayIndex].tempmax) {
        throw new Error("Invalid weather data");
    }
    return data.days[dayIndex].tempmax;
}

function getMinTemperature(data,dayIndex) {
    if (!data || !data.days || !data.days[dayIndex] || !data.days[dayIndex].tempmin) {
        throw new Error("Invalid weather data");
    }
    return data.days[dayIndex].tempmin;
}

function getCurrentCondition(data) {
    if (!data || !data.currentConditions || !data.currentConditions.conditions) {
        throw new Error("Invalid weather data");
    }
    return data.currentConditions.conditions;
}

function getCurrentIcon(data) {
    if (!data || !data.currentConditions || !data.currentConditions.icon) {
        throw new Error("Invalid weather data");
    }
    return data.currentConditions.icon;
}

export { getWeatherPromise, getDateString, getCurrentTemperature, getMaxTemperature, getMinTemperature, getCurrentCondition, getCurrentIcon };
const iconContext = require.context('../images',false, /\.(png|jpe?g|svg)$/);


function getWeatherIcon(weatherCondition) {
    const iconMapping = {
        'clear-day': 'clear-day.svg',
        'clear-night': 'clear-night.svg',
        'cloudy': 'cloudy.svg',
        'fog': 'fog.svg',
        'hail': 'hail.svg',
        'partly-cloudy-day': 'partly-cloudy-day.svg',
        'partly-cloudy-night': 'partly-cloudy-night.svg',
        'rain-snow-showers-day': 'rain-snow-showers-day.svg',
        'rain-snow-showers-night': 'rain-snow-showers-night.svg',
        'rain-snow': 'rain-snow.svg',
        'showers-day': 'showers-day.svg',
        'showers-night': 'showers-night.svg',
        'sleet': 'sleet.svg',
        'snow-showers-day': 'snow-showers-day.svg',
        'snow-showers-night': 'snow-showers-night.svg',
        'snow': 'snow.svg',
        'thunder-rain': 'thunder-rain.svg',
        'thunder-showers-day': 'thunder-showers-day.svg',
        'thunder-showers-night': 'thunder-showers-night.svg',
        'thunder': 'thunder.svg',
        'wind': 'wind.svg',
        'default': 'clear-day.svg' // Fallback icon
    };

    const iconFile = iconMapping[weatherCondition] || iconMapping.default;

    const iconPath = iconContext(`./${iconFile}`);

    return iconPath;
}

export { getWeatherIcon };
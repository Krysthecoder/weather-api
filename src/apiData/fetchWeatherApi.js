
export function fetchWeatherApi (latitude, longitude) {

    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const apiUrl = `${process.env.REACT_APP_WEATHER_API_URL}lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;

    return fetch(apiUrl)
    .then(response => response.json())

}
const currentLocation = document.getElementById('current-location');
const currentTemperature = document.getElementById('current-temperature');
const currentConditions = document.getElementById('current-conditions');

async function getWeatherData(location,units) {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&APPID=ac94a66ecd92872f9a5d676a0ccc3f08&units=imperial');
    const weather = await response.json();
    console.log(weather.main.temp);
}
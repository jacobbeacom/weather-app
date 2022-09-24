const currentLocation = document.getElementById('current-location');
const currentTemperature = document.getElementById('current-temperature');
const currentConditions = document.getElementById('current-conditions');

// Aac94a66ecd92872f9a5d676a0ccc3f08

document.getElementById('getWeather').addEventListener('click', async (e) => {
    e.preventDefault();
    const location = document.getElementById('searchbar').value;
    const result = await getWeatherData(location);
    console.log(result);
    populatePage(result);
    getWeatherGif();
});

async function getWeatherData(location) {
    try {
      const units = getUnits();
      let response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=ac94a66ecd92872f9a5d676a0ccc3f08&units=${units}`, {
          mode: 'cors'
      });
      console.log(response);
      let weather = await response.json();
      console.log(weather);
      return weather;
    } catch (error) {
      console.error(error);
    }
  }

  function getUnits() {
    const checkBox = document.getElementById('units');
    if (checkBox.checked == true) {
        return 'metric';
    } else {
        return 'imperial';
    }
}

  function populatePage(result) {
    function unitChar () {
      let unit;
      let unitType = getUnits();  
      if (unitType == 'imperial') {
        unit = 'F';
      } else {
        unit = 'C';
      };
      return unit;
    };
    currentLocation.innerHTML = result.name;
    currentTemperature.innerHTML = `${result.main.temp} ${unitChar()}°`;
    currentConditions.innerHTML = result.weather[0].description;
  }

  async function getWeatherGif() {
    const img = document.querySelector('img');
    const conditions = document.getElementById('current-conditions').innerHTML;
    
    const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=1hWWsAgbExBXg9E9OiJrYMCvLeDDJOhK&s=${conditions}`, {mode: 'cors'});
    const gifData = await response.json();
    console.log(gifData);
    img.src = gifData.data.images.original.url;
  }
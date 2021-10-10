import { processData } from "./DisplayWeather.js";
import { getCityWeather } from "./GetCityWeather.js";

const defaultCity = "london";

// immediately envoked function to show the first values
(async function firstRun() {
  let cityData = await getCityWeather(defaultCity);
  processData(
    cityData.main.temp.toFixed(1),
    cityData.main.feels_like.toFixed(1),
    cityData.main.temp_max.toFixed(1),
    cityData.main.temp_min.toFixed(1),
    defaultCity
  );
})();

function convertToCelsius(degrees) {
  return ((degrees - 32) * (5 / 9)).toFixed(1);
}

function convertToFarenheit(degrees) {
  return (degrees * (9 / 5) + 32).toFixed(1);
}

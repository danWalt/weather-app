import { config } from "./config.js";

const APIKEY = config.WEATHER_API_KEY;

export async function getCityWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`;
  const response = await fetch(url, { mode: "cors" });
  const cityData = await response.json();

  return cityData;
}

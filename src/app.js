import { config } from "./config.js";

const APIKEY = config.WEATHER_API_KEY;
let currentCity = "london";
let temp = "";
let feelsLike = "";
let dayMax = "";
let dayMin = "";
let flag = true;

async function getCityWeather(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`;
  const response = await fetch(url, { mode: "cors" });
  const cityData = await response.json();
  temp = cityData.main.temp.toFixed(1);
  feelsLike = cityData.main.feels_like.toFixed(1);
  dayMax = cityData.main.temp_max.toFixed(1);
  dayMin = cityData.main.temp_min.toFixed(1);
  processData();
}

async function processData() {
  if (flag) {
    initialize();
  } else {
    document.getElementById(
      "tempH2"
    ).innerText = `Current Temperture in ${currentCity}: ${temp}`;
    document.getElementById(
      "feelsLikeH2"
    ).innerText = `Feels Like: ${feelsLike}`;
    document.getElementById(
      "dayMaxH2"
    ).innerText = `${currentCity} daily max Temperture is: ${dayMax}`;
    document.getElementById(
      "dayMinH2"
    ).innerText = `${currentCity} daily lowest Temperture is: ${dayMin}`;
  }
}

function initialize() {
  showTemp();
  showFeelsLike();
  shownDayMax();
  shownDayMin();
  flag = false;
}

function showTemp() {
  const tempH2 = document.createElement("h2");
  tempH2.innerText = `Current Temperture in ${currentCity}: ${temp}`;
  tempH2.setAttribute("id", "tempH2");
  document.body.appendChild(tempH2);
}

function showFeelsLike() {
  const feelsLikeH2 = document.createElement("h2");
  feelsLikeH2.innerText = `Feels Like: ${feelsLike}`;
  feelsLikeH2.setAttribute("id", "feelsLikeH2");
  document.body.appendChild(feelsLikeH2);
}

function shownDayMax() {
  const dayMaxH2 = document.createElement("h2");
  dayMaxH2.innerText = `${currentCity} daily max Temperture is: ${dayMax}`;
  dayMaxH2.setAttribute("id", "dayMaxH2");
  document.body.appendChild(dayMaxH2);
}

function shownDayMin() {
  const dayMinH2 = document.createElement("h2");
  dayMinH2.innerText = `${currentCity} daily lowest Temperture is: ${dayMin}`;
  dayMinH2.setAttribute("id", "dayMinH2");
  document.body.appendChild(dayMinH2);
}

function convertToCelsius(degrees) {
  return ((degrees - 32) * (5 / 9)).toFixed(1);
}

function convertToFarenheit(degrees) {
  return (degrees * (9 / 5) + 32).toFixed(1);
}

function createForm() {
  const form = document.createElement("form");
  form.onsubmit = () => {
    return false;
  };

  //create input element
  let inputBox = document.createElement("input");
  inputBox.type = "text";
  inputBox.name = "user_name";
  inputBox.id = "user_name1";
  inputBox.defaultValue = currentCity;
  getCityWeather(inputBox.value);
  //create a button
  let submitButton = document.createElement("button");
  submitButton.type = "button";
  submitButton.innerText = "Submit";
  //submitButton.onsubmit = preventDefault()

  // add all elements to the form
  form.appendChild(inputBox);
  form.appendChild(submitButton);

  // add the form inside the body
  document.body.appendChild(form);

  submitButton.addEventListener("click", () => {
    currentCity = inputBox.value;
    getCityWeather(currentCity);
  });
}

createForm();

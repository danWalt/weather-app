import { getCityWeather } from "./GetCityWeather.js";
let currentCity = "london";
let temp = "";
let feelsLike = "";
let dayMax = "";
let dayMin = "";
let flag = true;

// updates variables with current city weather data
function holdValues(cityData) {
  temp = cityData.main.temp.toFixed(1);
  feelsLike = cityData.main.feels_like.toFixed(1);
  dayMax = cityData.main.temp_max.toFixed(1);
  dayMin = cityData.main.temp_min.toFixed(1);
}

//updates html text values
export async function processData(
  temp,
  feelsLike,
  dayMax,
  dayMin,
  currentCity
) {
  if (flag) {
    //when running for the first time, initializes inner text items with default city
    initialize(temp, feelsLike, dayMax, dayMin, currentCity);
  } else {
    {
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
}

// create html items for the first time
function initialize(temp, feelsLike, dayMax, dayMin, currentCity) {
  showTemp(currentCity, temp);
  showFeelsLike(feelsLike);
  shownDayMax(currentCity, dayMax);
  shownDayMin(currentCity, dayMin);
  flag = false;

  function showTemp(currentCity, temp) {
    const tempH2 = document.createElement("h2");
    tempH2.innerText = `Current Temperture in ${currentCity}: ${temp}`;
    tempH2.setAttribute("id", "tempH2");
    document.body.appendChild(tempH2);
  }

  function showFeelsLike(feelsLike) {
    const feelsLikeH2 = document.createElement("h2");
    feelsLikeH2.innerText = `Feels Like: ${feelsLike}`;
    feelsLikeH2.setAttribute("id", "feelsLikeH2");
    document.body.appendChild(feelsLikeH2);
  }

  function shownDayMax(currentCity, dayMax) {
    const dayMaxH2 = document.createElement("h2");
    dayMaxH2.innerText = `${currentCity} daily max Temperture is: ${dayMax}`;
    dayMaxH2.setAttribute("id", "dayMaxH2");
    document.body.appendChild(dayMaxH2);
  }

  function shownDayMin(currentCity, dayMin) {
    const dayMinH2 = document.createElement("h2");
    dayMinH2.innerText = `${currentCity} daily lowest Temperture is: ${dayMin}`;
    dayMinH2.setAttribute("id", "dayMinH2");
    document.body.appendChild(dayMinH2);
  }
}

// create the search box and button to change displayed city
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

  // updates shown values on button click
  submitButton.addEventListener("click", async () => {
    currentCity = inputBox.value;
    let cityData = await getCityWeather(currentCity);
    holdValues(cityData);
    processData(temp, feelsLike, dayMax, dayMin, currentCity);
  });
}

createForm();

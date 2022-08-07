const nameElement = document.getElementById("name");
const tempElement = document.getElementById("temp");
const mainElement = document.getElementById("main");
const descElement = document.getElementById("desc");
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const imgElement = document.getElementById("image");
const backgroundGraphic = document.createElement("img");
const backgroundGraphicTwo = document.createElement("img");
document.body.appendChild(backgroundGraphic);
document.body.appendChild(backgroundGraphicTwo);

//get weather from API

async function getWeather(city) {
  const apiKey = "1b5148ce2b26ec158cbc87c179c39564";
  const response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&units=" +
      "metric" +
      "&APPID=" +
      apiKey,
    { mode: "cors" }
  );
  const data = await response.json();
  renderWeather(data);
}

//render information to page

function renderWeather(data) {
  const { name } = data;
  const { main, description, icon } = data.weather[0];
  const { temp } = data.main;
  const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
  nameElement.innerText = name;
  tempElement.innerText = Math.round(temp) + "°";
  descElement.innerText = description[0].toUpperCase() + description.slice(1);
  imgElement.src = iconUrl;
  let pattern = /..d/;
  const time = pattern.test(icon) ? "day" : "night";

  setStyle(main, description, time);

  console.log(name, main, description, temp, iconUrl, icon, time, pattern);
}

//set dynamic weather styling

function setStyle(weatherType, secondaryWeather, time) {
  switch (weatherType) {
    case "Clear":
      clearStyle(time);
      break;
    case "Clouds":
      cloudsStyle(secondaryWeather, time);
      break;
    case "Drizzle":
      drizzleStyle(time);
      break;
    case "Rain":
      rainStyle(time);
      break;
    case "Snow":
      snowStyle(time);
      break;
    case "Thunderstorm":
      thunderstormStyle(time);
      break;
    case "Haze":
      cloudsStyle(time);
      break;
  }
}

// style backgrounds

function clearStyle(time) {
  clearGradient(time);
  clearOverlay(time);
}

function cloudsStyle(secondaryWeather, time) {
  if (
    secondaryWeather === "few clouds" ||
    secondaryWeather === "scattered clouds"
  ) {
    clearGradient(time);
    clearOverlay(time);
    cloudOverlay();
  } else {
    overcastGradient(time);
    cloudOverlay();
  }
}

function drizzleStyle(time) {
  overcastGradient();
  cloudOverlay();
  rainOverlay(0.5);
}

function rainStyle(time) {
  overcastGradient();
  cloudOverlay();
  rainOverlay(1);
}

function snowStyle(time) {
  snowGradient();
  snowOverlay();
}

function thunderstormStyle() {
  overcastGradient();
  thunderstormOverlay();
}

// graphics for weather

function clearGradient(time) {
  if (time === "day") {
    document.body.style.background =
      "linear-gradient(to bottom, #2589BD, #B5E2FA)";
  } else {
    document.body.style.background =
      "linear-gradient(to bottom, #121420, #2C2B3C)";
  }
}
function overcastGradient(time) {
  if (time === "day") {
    document.body.style.background =
      "linear-gradient(to bottom, #808F9D, #E2DFE0)";
  } else {
    document.body.style.background =
      "linear-gradient(to bottom, #1D2020, #2C333A)";
  }
}
function snowGradient(time) {
  document.body.style.backgroundColor = "#F9F7F3";
}
function clearOverlay(time) {
  console.log(time);
  if (time === "day") {
    backgroundGraphic.setAttribute("id", "sun");
    backgroundGraphic.src = "./lensflare.png";
    backgroundGraphicTwo.src = "";
  } else {
    backgroundGraphic.setAttribute("id", "star");
    backgroundGraphic.src = "./astroid.svg";
    backgroundGraphicTwo.setAttribute("id", "star2");
    backgroundGraphicTwo.src = "./astroid.svg";
  }
}
function cloudOverlay() {
  backgroundGraphic.setAttribute("id", "cloud");
  backgroundGraphic.src = "./cloud.svg";
  backgroundGraphicTwo.setAttribute("id", "cloud2");
  backgroundGraphicTwo.src = "./cloud.svg";
}

function rainOverlay(strength) {}
function snowOverlay() {}
function thunderstormOverlay() {}

// search

function search() {
  getWeather(searchBar.value);
  searchBar.value = "";
}

// event listeners

searchButton.addEventListener("click", function () {
  search();
});

searchBar.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    search();
  }
});

//init

getWeather("los angeles");

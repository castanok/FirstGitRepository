//Display the current date and time
let now = new Date();
let h6 = document.querySelector("h6");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h6.innerHTML = `${day} ${hours}:${minutes}`;

//When searching for a city, display the name of the city and its current temperature
function getCity(event) {
  event.preventDefault();
  let city = event.target[0].value;
  if (!city) {
    alert("Please type a location");
  }
  return city;
}
let isMetric = false;
document.getElementById("celsius-link").addEventListener("click", toggleMetric);
document
  .getElementById("fahrenheit-link")
  .addEventListener("click", toggleMetric);

function toggleMetric() {
  isMetric = !isMetric;
  searchLocation(document.querySelector("h5").innerHTML);
}

function updateWeather(city, temp) {
  document.querySelector("h5").innerHTML = city;
  document.querySelector("#temperature").innerHTML = Math.round(temp);
  let cl = document.querySelector("#celsius-link");
  let fa = document.querySelector("#fahrenheit-link");
  if (isMetric) {
    cl.style.color = "red";
    fa.style.color = "black";
  } else {
    cl.style.color = "black";
    fa.style.color = "red";
  }
}

function onResponse(res) {
  let temp = res.data.main.temp;
  let city = res.data.name;
  //console.log("ciudad: " + city + " temp: " + temp[0]);
  updateWeather(city, temp);
}

function onSubmit(event) {
  let city = getCity(event);
  searchLocation(city);
}

function searchLocation(city) {
  //console.log(response);
  let key = "e67b2b5830af9529a465a4bfff6f0c86";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}${
    isMetric ? "&units=metric" : ""
  }`;

  axios.get(url).then(onResponse);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", onSubmit);

//Current location button
function cityFromCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let key = "e67b2b5830af9529a465a4bfff6f0c86";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}${
    isMetric ? "&units=metric" : ""
  }`;
  axios.get(url).then(onResponse);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(cityFromCoords);
}
let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);
navigator.geolocation.getCurrentPosition(cityFromCoords);

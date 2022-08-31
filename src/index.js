let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let today = document.querySelector("#day-now");
today.innerHTML = day;
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("#time-now");
time.innerHTML = `${hours}:${minutes}`;

function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city-now");
  currentCity.innerHTML = cityName.value;
  let apiKey = "bdab7653b025bf7285d5d743a7dfefad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let feeling = Math.round(response.data.main.feels_like);
  let hum = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  currentTemperature.innerHTML = `${temperature}˚C`;
  currentMaxTemp.innerHTML = `${maxTemp}˚C`;
  currentMinTemp.innerHTML = `${minTemp}˚C`;
  feelsLike.innerHTML = `${feeling}`;
  humidity.innerHTML = `${hum}`;
  windNow.innerHTML = `${wind}`;
  cityNow.innerHTML = `${city}`;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "bdab7653b025bf7285d5d743a7dfefad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function updateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", searchCity);
let currentTemperature = document.querySelector("#current-temp");
let currentMaxTemp = document.querySelector("#temp-max-now");
let currentMinTemp = document.querySelector("#temp-min-now");
let feelsLike = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let windNow = document.querySelector("#wind");
let cityNow = document.querySelector("#city-now");

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", updateLocation);

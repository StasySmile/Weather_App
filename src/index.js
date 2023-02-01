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

function search(city) {
  let apiKey = "bdab7653b025bf7285d5d743a7dfefad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  search(cityName.value);
}

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let maxTemp = Math.round(response.data.main.temp_max);
  let minTemp = Math.round(response.data.main.temp_min);
  let feeling = Math.round(response.data.main.feels_like);
  let hum = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let city = response.data.name;
  let currentIcon = response.data.weather[0].icon;
  let description = response.data.weather[0].description;

  if (currentIcon === "01d" || currentIcon === "01n") {
    weatherIconNow.setAttribute("src", "src/clear_sky.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "02d" || currentIcon === "02n") {
    weatherIconNow.setAttribute("src", "src/few_clouds.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "03d" || currentIcon === "03n") {
    weatherIconNow.setAttribute("src", "src/scattered_clouds.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "04d" || currentIcon === "04n") {
    weatherIconNow.setAttribute("src", "src/broken_clouds.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "09d" || currentIcon === "09n") {
    weatherIconNow.setAttribute("src", "src/shower_rain.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "10d" || currentIcon === "10n") {
    weatherIconNow.setAttribute("src", "src/rain.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "11d" || currentIcon === "11n") {
    weatherIconNow.setAttribute("src", "src/thunderstorm.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "13d" || currentIcon === "13n") {
    weatherIconNow.setAttribute("src", "src/snow.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  } else if (currentIcon === "50d" || currentIcon === "50n") {
    weatherIconNow.setAttribute("src", "src/mist.png");
    weatherIconNow.setAttribute("alt", response.data.weather[0].description);
  }
  currentTemperature.innerHTML = `${temperature}˚C`;
  currentMaxTemp.innerHTML = `${maxTemp}˚C`;
  currentMinTemp.innerHTML = `${minTemp}˚C`;
  feelsLike.innerHTML = `${feeling}`;
  humidity.innerHTML = `${hum}`;
  windNow.innerHTML = `${wind}`;
  cityNow.innerHTML = `${city}`;
  weatherDescription.innerHTML = `${description}`;

  getForecast(response.data.coord);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = ``;
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="Monday row" id='day${index}'>   
      <div class="day col-5">
              <span class="align">${formatDay(forecastDay.dt)}</span>
          </div>
          <div class="col-3">
              <span class="align"
                ><img class="weather-pic" id="weather-pic" src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt=""
              /></span>
          </div>
          <div class="temp col-4">
              <div class="high">${Math.round(forecastDay.temp.max)}˚C</div>
              <div class="low">${Math.round(forecastDay.temp.min)}˚C</div>
          </div>
          </div>
          `;
    }
  });
  forecastHTML = forecastHTML + ``;
  forecastElement.innerHTML = forecastHTML;
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", handleSubmit);
let currentTemperature = document.querySelector("#current-temp");
let currentMaxTemp = document.querySelector("#temp-max-now");
let currentMinTemp = document.querySelector("#temp-min-now");
let feelsLike = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let windNow = document.querySelector("#wind");
let cityNow = document.querySelector("#city-now");
let weatherIconNow = document.querySelector("#weather-icon-now");
let weatherDescription = document.querySelector("#description");

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", updateLocation);

search("Kyiv");
displayForecast();

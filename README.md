# Weather_App
Weather app shows real-time weather forecast for any location using API.
> [Live demo](https://bw-weather-app.netlify.app) 

## Table of Contents
* [General Info](#general-information)
* [Built With](#built-with)
* [Features](#features)
* [Usage](#usage)
* [Getting Started](#getting-started)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)
* [License](#license)


## General Information
I developed this project to gain a deeper understanding of JavaScript specifics and API concepts.


## Built With
- Visual Studio Code
- HTML5
- CSS3
- Bootstrap5
- JavaScript


## Features
- Search for a specific location and display current weather conditions, including temperature, humidity, wind speed, and a weather icon.
- Display a 5-day weather forecast for the location, including the high and low temperatures for each day.


## Usage
Follow the live demo link and click the "Current location" button to check the weather at your city or type a desired city name in the search field and click the "Search" button.


## Getting Started
### Dependencies
- [OpenWeatherMap API](https://openweathermap.org/) for weather data.
- [Bootstrap](https://getbootstrap.com/) for styling and layout.

### Setup and Running the App
- Clone the repository: 
```
git clone https://github.com/StasySmile/Weather_App.git
```
- Put into ```./src/index.js``` your OpenWeatherMap API keys for [current weather](https://openweathermap.org/current)
```js
function search(city) {
  let apiKey = "bdab7653b025bf7285d5d743a7dfefad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
```
and for 5 days [weather forecast](https://openweathermap.org/forecast16)
```js
function getForecast(coordinates) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
```
- Locate the folder ```Weather_App``` with the cloned project and open the ```index.html``` in your browser.


## Room for Improvement
To do:
- Add save feature for frequently searched locations for quick access in the future.


## Acknowledgements
This project was developed as part of [SheCodes](https://www.shecodes.io/) workshop.


## Contact
Created by [Anastasiia Polieshko](https://anastasiia-polieshko.netlify.app) - feel free to contact me!


## License
This project is open source and available under the [MIT](/LICENSE.txt) License.

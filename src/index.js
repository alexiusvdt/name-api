import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'

// Business Logic

function getWeather(city) {
  let promise = WeatherService.getWeather(city);
  promise.then(function(weatherDataArray) {
    printElements(weatherDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}
function timeCalc(api) {
  let timeOut;
  timeOut = ((api / 60) / 60);
  return timeOut;
}

// UI Logic

function printElements(data) {
  const img  = document.createElement("img");
  img.setAttribute("src", "https://storage.needpix.com/rsynced_images/arrow-39450_1280.png");
  img.setAttribute("width", "100px");
  img.style.transform = `rotate(${data[0].wind.deg}deg)`;
  let time = timeCalc(data[0].timezone);
  document.querySelector('#showResponse').innerText = `Its timezone is GMT ${time}. The humidity in ${data[1]} is ${data[0].main.humidity}%.\n The temperature in Fahrenheit is ${data[0].main.temp} degrees. Current conditions: ${data[0].weather[0].description}\n
  Winds of ${data[0].wind.speed} mph with gusts of ${data[0].wind.gust} mph.`;
  document.querySelector("#windarrow").appendChild(img);
}

function printError(error) {
  document.querySelector('#showresponse').innerText = `There was an error accessing the weather data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const city = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getWeather(city);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});


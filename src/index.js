import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'

// Business Logic

function getNationality(name) {
  let promise = NationalityService.getNationality(name);
  promise.then(function(nameDataArray) {
    printElements(nameDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

function toPercent(apiData) {
  let percent = apiData * 100;
  return percent
}

// UI Logic

function printElements(data) {
  let top = toPercent(data[0].probability);
  document.querySelector('#showResponse').innerText = `The name ${data[1]} is most likely to be from ${data[0].country_id} with ${top} probability.          `
  
}
  // `Its timezone is GMT ${time}. The humidity in ${data[1]} is ${data[0].main.humidity}%.\n The temperature in Fahrenheit is ${data[0].main.temp} degrees. Current conditions: ${data[0].weather[0].description}\n
  // Winds of ${data[0].wind.speed} mph with gusts of ${data[0].wind.gust} mph.`;
  


function printError(error) {
  document.querySelector('#showresponse').innerText = `There was an error accessing the data for ${error[2]}: ${error[0].status} ${error[0].statusText}: ${error[1].message}`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const name = document.querySelector('#location').value;
  document.querySelector('#location').value = null;
  getNationality(name);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
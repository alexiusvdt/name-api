import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

// Business Logic

function getWeather(city) {
  let request = new XMLHttpRequest();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=imperial`;

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    console.log(response);
    try {
      checkResp(this.status);
    } catch(error) {
      console.log((`${error}`))
    }
    if (this.status === 200) {
      printElements(response, city);
    }
  })
  request.open("GET", url, true);
  request.send();
}

function timeCalc(api) {
  let timeOut;
  timeOut = ((api / 60) / 60);
  return timeOut;
}

  // catch...the rest of it

// UI Logic

function checkResp(response) {
  if(response !== 200) {
    console.log(`bad response ${response}`);
    throw new Error("bad HTTP request");
  } else {
    console.log("request successful");
  }
}

function printElements(apiResponse, city) {
  const img  = document.createElement("img");
  img.setAttribute("src", "https://storage.needpix.com/rsynced_images/arrow-39450_1280.png");
  img.setAttribute("width", "20px");
  img.style.transform = `rotate(${apiResponse.wind.deg}deg)`;
  let time = timeCalc(apiResponse.timezone);
  document.querySelector('#showResponse').innerText = `Its timezone is GMT ${time}. The humidity in ${city} is ${apiResponse.main.humidity}%.\n
  The temperature in Fahrenheit is ${apiResponse.main.temp} degrees. Current conditions: ${apiResponse.weather[0].description}\n
  Winds of ${apiResponse.wind.speed} mph with gusts of ${apiResponse.wind.gust} mph.`;
  document.querySelector("#windarrow").appendChild(img);
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


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import NationalityService from './js/nationality-service.js';

// Business Logic

function getNationality(name) {
  let promise = NationalityService.getNationality(name);
  promise.then(function(nameDataArray) {
    printElements(nameDataArray);
  }, function(errorArray) {
    printError(errorArray);
  });
}

// function toPercent(apiData) {
//   let percent = apiData * 100;
//   return percent;
// }

// function countryName(data) {
//   const countries = require("i18n-iso-countries");
//   countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
//   let list = countries.getNames("en", {select: "official"});
//   let target = data[0].country[0].country_id;
//   let result;
//   Object.entries(list).forEach(function (country) { 
//     if (country.includes(target)) {
//       result = country[1];
//       // console.log('result', result)
//     }
//   });
//   return result;
// }


// backup of original name function
// function countryName(data) {
//   const countries = require("i18n-iso-countries");
//   countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
//   let list = countries.getNames("en", {select: "official"});
//   let target = data[0].country[0].country_id;
//   let result;
//   Object.entries(list).forEach(function (country) { 
//     if (country.includes(target)) {
//       result = country[1];
//       // console.log('result', result)
//     }
//   });
//   return result;
// }

function topFive(data) {
  let locations = [];
  Object.values(data).forEach(key => {
  locations.push(key)
  });
  console.log(locations);
  return locations;
  }



// UI Logic

function printElements(data) {
  // console.log(data);
  //transforms response into array of 5 objects
  let location = topFive(data[0].country);
  //pop each object out & translate
  //run countryName() on the list 
  //run toPercent
  //append to list


  // let string = JSON.stringify(location)
  // let fullName = countryName(location);
  // let top = toPercent(location[0].probability);
  document.querySelector('#showResponse').innerText = `Here are the top five results for ${data[1]} with the related probability:`;

}

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
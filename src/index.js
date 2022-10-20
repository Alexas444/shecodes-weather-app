// Current Date

function formatWeekdayTime(date) {
  let days = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
  let currentWeekDay = days[date.getDay()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentWeekDay} | ${currentHour}:${currentMinute}`;
}

function formatDate(date) {
  let currentDay = date.getDate();
  let months = [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`];
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();
  return `${currentDay} ${currentMonth} ${currentYear}`;
}

let now = new Date();
let currentWeekdayTime = document.querySelector("#current-date-weekday-time")
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);
currentWeekdayTime.innerHTML = formatWeekdayTime(now);

// Search Engine

function showWeatherToday(response) {
  console.log(response);
  let regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#temp-number").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#weather-info-adj-today").innerHTML = response.data.weather[0].main;
  document.querySelector("#feels-like-today").innerHTML = Math.round(response.data.main.feels_like) + `℃`;
  document.querySelector("#humidity-today").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-today-km").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#displayed-country").innerHTML = regionNames.of(response.data.sys.country);
}

function search(searchedCity) {
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${searchedCity}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeatherToday);
}

function searchCity(event) {  
  event.preventDefault();
  let searchedCity = document.querySelector("#search-field").value;
  search(searchedCity);
}

function searchLocation(position) {
  let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
  let unit = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherToday);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", displayCurrentLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

search("Toronto");

// Temperature Switch

function showFarenheitTemp(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#temp-number");
  let temp = tempNumber.innerHTML;
  tempNumber.innerHTML = Math.round(temp * 9/5) + 32;
  temp = Number(temp);
}

let farenheitTemp = document.querySelector("#farenheit-temp");
farenheitTemp.addEventListener("click", showFarenheitTemp);

function showCelsiusTemp(event) {
  event.preventDefault();
  let tempNumber = document.querySelector("#temp-number");
  tempNumber.innerHTML = "26";
}

let celsiusTemp = document.querySelector("#celsius-temp");
celsiusTemp.addEventListener("click", showCelsiusTemp);


//Date

function formatWeekdayTime(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = weekdays[date.getDay()];
  return `Last updated at: ${weekday} ${hour}:${minute} (local time)`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

//Forecast

function showForecast(response) {
let forecastElement = document.querySelector("#forecast");
  let days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function(day) {
    forecastHTML = forecastHTML +
      `<div class="col-2">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${day}</h5>
            <h6 class="card-undertitle">25 July 2022</h6>
            <span class="weather-info-temp-future"><img class="forecast-icon" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png" alt=""> <br> 24℃ | 76℉</span>
            <p class="card-text">
              <span class="weather-info-adj-future">Mostly sunny</span>
          </div>
        </div>
      </div>
      `
  });
  forecastHTML = forecastHTML + `</div>`
  forecastElement.innerHTML = forecastHTML;
}

// Temperature

function showTemp(response) {
  
  celsiusTemp = Math.round(response.data.temperature.current);
  feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  windSpeed = Math.round(response.data.wind.speed);

  document.querySelector("#temp-number-today").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#displayed-city").innerHTML = response.data.city;
  document.querySelector("#displayed-country").innerHTML = response.data.country;
  document.querySelector("#weather-info-descr-today").innerHTML = response.data.condition.description;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(response.data.temperature.feels_like)} ℃`;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#current-date-weekday-time").innerHTML = formatWeekdayTime(response.data.time * 1000);
  document.querySelector("#current-date").innerHTML = formatDate(response.data.time * 1000);
  document.querySelector("#weather-info-emoji-today").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  document.querySelector("#weather-info-emoji-today").setAttribute("alt", response.data.condition.description);
}

// Search Engine

function searchCity(city) {
  let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
  let unit = "metric";
  let apiEndpointCurrent = "https://api.shecodes.io/weather/v1/current?";
  let apiUrlCurrent = `${apiEndpointCurrent}query=${city}&key=${apiKey}&units=${unit}`;
  let apiEndpointForecast = "https://api.shecodes.io/weather/v1/forecast?";
  let apiUrlForecast = `${apiEndpointForecast}query=${city}&key=${apiKey}&units=${unit}`;
  
  axios.get(apiUrlCurrent).then(showTemp);
  axios.get(apiUrlForecast).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-field");
  searchCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Unit Conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let tempTodayElement = document.querySelector("#temp-number-today");
  tempTodayElement.innerHTML = Math.round((celsiusTemp * 9/5) + 32);
  let feelsLikeTempElement = document.querySelector("#feels-like-temp");
  feelsLikeTempElement.innerHTML = `${Math.round((feelsLikeTemp * 9/5) + 32)} ℉`;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${Math.round(windSpeed / 1.609)} mph`;
}

function showCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let tempTodayElement = document.querySelector("#temp-number-today");
  tempTodayElement.innerHTML = celsiusTemp;
  let feelsLikeTempElement = document.querySelector("#feels-like-temp");
  feelsLikeTempElement.innerHTML = `${feelsLikeTemp} ℃`;
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${windSpeed} km/h`;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemp = null;
let feelsLikeTemp = null;
let windSpeed = null;

// -----

searchCity("Toronto");
//Date

function formatCurrentWeekdayTime(timestamp) {
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

function formatCurrentDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

//Forecast

function formatForecastWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let weekday = weekdays[date.getDay()];

  return weekday;
}

function formatForecastDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDate();
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`
}

function showForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
      if (index < 6) {
      forecastHTML = forecastHTML +
        `<div class="col-2">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title forecast-weekday">${formatForecastWeekday(forecastDay.time)}</h5>
              <h6 class="card-undertitle">${formatForecastDate(forecastDay.time)}</h6>
              <div class="weather-info-icon-future">
                <img class="forecast-icon" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="">
              </div> 
              <div class="weather-info-temp-future">
               <span class="forecast-max-temp">${Math.round(forecastDay.temperature.maximum)}°</span> | <span class="forecast-min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
              <p class="card-text">
                <span class="weather-info-adj-future">${forecastDay.condition.description}</span>
              </p>
            </div>
          </div>
        </div>
       `;
      }
    });
    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;
}

// Temperature

function showTemp(response) {
  celsiusTemp = Math.round(response.data.temperature.current);
  fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);
  feelsLikeTemp = Math.round(response.data.temperature.feels_like);
  windSpeed = Math.round(response.data.wind.speed);

  document.querySelector("#temp-number-today").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#displayed-city").innerHTML = response.data.city;
  document.querySelector("#displayed-country").innerHTML = response.data.country;
  document.querySelector("#weather-info-descr-today").innerHTML = response.data.condition.description;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(response.data.temperature.feels_like)} ℃`;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#current-date-weekday-time").innerHTML = formatCurrentWeekdayTime(response.data.time * 1000);
  document.querySelector("#current-date").innerHTML = formatCurrentDate(response.data.time * 1000);
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
  tempTodayElement.innerHTML = fahrenheitTemp;
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
let fahrenheitTemp = null;
let feelsLikeTemp = null;
let windSpeed = null;

// -----

searchCity("Toronto");
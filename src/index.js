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
  let ampmTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
  return `${weekday} ${ampmTime} (local time)`;
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
              <h6 class="card-undertitle forecast-date">${formatForecastDate(forecastDay.time)}</h6>
              <div class="forecast-emoji">
                <img class="forecast-emoji-img-element" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="">
              </div> 
              <div class="forecast-temp">
               <span class="forecast-max-temp">${Math.round(forecastDay.temperature.maximum)}°</span> | <span class="forecast-min-temp">${Math.round(forecastDay.temperature.minimum)}°</span>
              </div>
              <p class="card-text">
                <span class="forecast-weather-description">${capitalizeFirstLetter(forecastDay.condition.description)}</span>
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
  document.querySelector("#current-temp-number").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#displayed-city").innerHTML = response.data.city;
  document.querySelector("#displayed-country").innerHTML = response.data.country;
  document.querySelector("#current-weather-description").innerHTML = response.data.condition.description;
  document.querySelector("#feels-like-temp").innerHTML = `${Math.round(response.data.temperature.feels_like)} ℉`;
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = `${Math.round(response.data.wind.speed)} mph`;
  document.querySelector("#current-weekday-time").innerHTML = formatCurrentWeekdayTime(response.data.time * 1000);
  document.querySelector("#current-date").innerHTML = formatCurrentDate(response.data.time * 1000);
  document.querySelector("#current-emoji-img-element").setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  document.querySelector("#current-emoji-img-element").setAttribute("alt", response.data.condition.description);
}

// Search Engine

function searchCity(city) {
  let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
  let unit = "imperial";
  let apiEndpointCurrent = "https://api.shecodes.io/weather/v1/current?";
  let apiUrlCurrent = `${apiEndpointCurrent}query=${city}&key=${apiKey}&units=${unit}`;
  let apiEndpointForecast = "https://api.shecodes.io/weather/v1/forecast?";
  let apiUrlForecast = `${apiEndpointForecast}query=${city}&key=${apiKey}&units=${unit}`;
  
  axios.get(apiUrlCurrent).then(showTemp);
  axios.get(apiUrlForecast).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Current Location Button

function getCurrentLocation(position) {
  let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
  let unit = "imperial";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function handleClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", handleClick);


// -----

searchCity("Toronto");
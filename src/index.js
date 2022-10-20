// Temperature + Date
function formatWeekdayTime(timestamp){
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
  return `${weekday} ${hour}:${minute}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let day = date.getDate();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

function showTemp(response){
  console.log(response.data);
  let tempToday = document.querySelector("#temp-number-today");
  tempToday.innerHTML = Math.round(response.data.temperature.current);
  let displayedCity = document.querySelector("#displayed-city");
  displayedCity.innerHTML = response.data.city;
  let displayedCountry = document.querySelector("#displayed-country");
  displayedCountry.innerHTML = response.data.country;
  let descrToday = document.querySelector("#weather-info-descr-today");
  descrToday.innerHTML = response.data.condition.description;
  let feelsLikeProp = document.querySelector("#feels-like");
  feelsLikeProp.innerHTML = Math.round(response.data.temperature.feels_like);
  let humidityProp = document.querySelector("#humidity");
  humidityProp.innerHTML = response.data.temperature.humidity;
  let windSpeedKmProp = document.querySelector("#wind-km");
  windSpeedKmProp.innerHTML = Math.round(response.data.wind.speed);
  let currentWeekDayTime = document.querySelector("#current-date-weekday-time");
  currentWeekDayTime.innerHTML = formatWeekdayTime(response.data.time * 1000);
  let currentDate = document.querySelector("#current-date");
  currentDate.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
let unit = "metric";
let apiUrl = `${apiEndpoint}query=Toronto&key=${apiKey}&units=${unit}`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemp);
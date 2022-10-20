//Date

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

// Temperature

function showTemp(response){
  console.log(response.data);
  document.querySelector("#temp-number-today").innerHTML = Math.round(response.data.temperature.current);
  document.querySelector("#displayed-city").innerHTML = response.data.city;
  document.querySelector("#displayed-country").innerHTML = response.data.country;
  document.querySelector("#weather-info-descr-today").innerHTML = response.data.condition.description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.temperature.feels_like);
  document.querySelector("#humidity").innerHTML = response.data.temperature.humidity;
  document.querySelector("#wind-km").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#current-date-weekday-time").innerHTML = formatWeekdayTime(response.data.time * 1000);
  document.querySelector("#current-date").innerHTML = formatDate(response.data.time * 1000);
}

// API Integration

let apiKey = "ab34b6cfb76f0e4bt38a1d0d31751o81";
let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
let unit = "metric";
let apiUrl = `${apiEndpoint}query=Toronto&key=${apiKey}&units=${unit}`;
console.log(apiUrl);

axios.get(apiUrl).then(showTemp);
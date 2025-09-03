function searchSubmission(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-form-input");
  let city = searchBox.value;

  let apiKey = "o43fad540acb9b0t06a993fb7c4f5697";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"  />`;
  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#weather-app-time");
  
  console.log(response.data);

  temperatureElement.innerHTML = temperature
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = icon
  
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchFormSelector = document.querySelector("#search-form");
searchFormSelector.addEventListener("submit", searchSubmission);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function showTemperature(event) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let weatherIcon = response.condition.icon;

  let weatherIconElement = document.querySelector("#current-temperature-icon");
  weatherIconElement.innerHTML = weatherIcon.value;

  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-input");
  let cityInput = searchBox.value;

  let url =
    "https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial";
  let apiKey = "o43fad540acb9b0t06a993fb7c4f5697";

  axios.get(url).then(showTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 30) {
    minutes = `0${minutes}`;
  }

  if (hours < 12) {
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

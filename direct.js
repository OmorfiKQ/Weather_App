function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let icon = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"  />`;
  let currentDateELement = document.querySelector("#date-time");
  let currentDate = new Date(response.data.time * 1000);
  


  temperatureElement.innerHTML = temperature
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} mph`;
  iconElement.innerHTML = icon
  currentDateELement.innerHTML = formatDate(currentDate);
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "o43fad540acb9b0t06a993fb7c4f5697";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

city = "Miami";
searchCity(city);

function searchSubmission(event) {
  event.preventDefault();
  let searchBox = document.querySelector("#search-form-input");
  searchCity(searchBox.value);
}

function displayForecast() {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">${day}</div>
    <div class="weather-forecast-icon">⛅</div>
    <div class="weather-forecast-temps">
      <div class="weather-forecast-temp">
        <strong>24°</strong>
      </div>
       <div class="weather-forecast-temp">18°</div>
    </div>
  </div>
`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormSelector = document.querySelector("#search-form");
searchFormSelector.addEventListener("submit", searchSubmission);

displayForecast();







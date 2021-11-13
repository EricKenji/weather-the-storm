var searchEl = document.querySelector(".text-input");
var searchFormEl = document.querySelector(".search-form");
var btnEl = document.querySelector(".button");

// search city function
var searchCity = function (event) {
    event.preventDefault();

    var cityName = searchEl.value.trim();
    if (cityName) {
        fetchCurrent(cityName);
    }
};

// fetch API data
var fetchCurrent = (city) => {
    var apiCall = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9488ec8c097fd6f500089eda4c1d7cef";

    fetch(apiCall).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrent(data);
                console.log(data);
            });
        } else {
            alert("Not a valid city name");
        }
    });
};

// Display current weather function //
var displayCurrent = function(data) {
    //DOM elements to be changed
    var currentCityEl = document.querySelector(".current-city");
    var iconEl = document.querySelector("#icon");
    var statusEl = document.querySelector("#status");
    var temperatureEl = document.querySelector("#temp");
    var windspeedEl = document.querySelector("#windspeed");
    var humidityEl = document.querySelector("#humidity");

    // Display current city
    currentCityEl.textContent = data.name;
    // Display icon and status
    iconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png");
    statusEl.textContent = data.weather[0].main;
    // change temperature, windspeed, and humidity
    temperatureEl.textContent = data.main.temp;
    windspeedEl.textContent = data.wind.speed;
    humidityEl.textContent = data.main.humidity;
};








  //Event listeners
  btnEl.addEventListener("click", searchCity);
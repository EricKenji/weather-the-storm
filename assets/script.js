var searchEl = document.querySelector(".text-input");
var searchFormEl = document.querySelector(".search-form");
var btnEl = document.querySelector(".button");

// search city function
var searchCity = function (event) {
    event.preventDefault();

    var cityName = searchEl.value.trim();
    if (cityName) {
        fetchCurrent(cityName);
        storeCity(cityName);
        addSearchHistory(cityName);
    }
};


// Create City Array

var storeCity = function (city) {
    citiesArray.push(city);
};

// add to search history
var addSearchHistory = function (cityName) {
    var historyBtn = document.createElement("button");
    historyBtn.innerHTML = cityName;
    document.getElementById("button1").appendChild(historyBtn);
};

// set City names to local storage
var namesInStorage = localStorage.getItem("city-names");
var citiesArray;
if (namesInStorage === null) {
    citiesArray = [];
} else {
    citiesArray = JSON.parse(namesInStorage);
};
for (var i = 0; i < citiesArray.length; i++) {
    addSearchHistory(citiesArray[i]);
}



// fetch API data
var fetchCurrent = (city) => {
    var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9488ec8c097fd6f500089eda4c1d7cef";

    fetch(apiCurrent).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrent(data);
                fetchUv(data);
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
    var dateEl = document.querySelector("#date");
    var temperatureEl = document.querySelector("#temp");
    var windspeedEl = document.querySelector("#windspeed");
    var humidityEl = document.querySelector("#humidity");

    // Display current city
    currentCityEl.textContent = data.name;
    // Display icon and status
    iconEl.setAttribute("src", "https://openweathermap.org/img/wn/"+ data.weather[0].icon + "@2x.png");
    statusEl.textContent = data.weather[0].main;
    // Display date using Moment 
    dateEl.textContent = " " + moment().format('MMMM Do YYYY');
    // change temperature, windspeed, and humidity
    temperatureEl.textContent = data.main.temp + " F";
    windspeedEl.textContent = data.wind.speed + " MPH";
    humidityEl.textContent = data.main.humidity + "%";
};

// fetch API UV index
var fetchUv = function (data) {
    var apiUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&APPID=9488ec8c097fd6f500089eda4c1d7cef";
    // Fetch API URL
    fetch(apiUv).then(function (response) {
            response.json().then(function (data) {
                console.log(data);
                displayUv(data);;

            });
    });
};

// Display UV Index
var displayUv = function (data) {
    var uvIndexEl = document.querySelector("#uv-index");
    console.log(data.current.uvi)
    uvIndexEl.textContent = 15;

    // Change color of UV Index 
    if (parseInt(uvIndexEl.textContent) < 3) {
        uvIndexEl.className = "low";
    } else if (3 <= parseInt(uvIndexEl.textContent) && parseInt(uvIndexEl.textContent) < 5) {
        uvIndexEl.className = "moderate";
    } else if (5 <= parseInt(uvIndexEl.textContent) && parseInt(uvIndexEl.textContent) < 7) {
        uvIndexEl.className = "high";
    } else if (7 <= parseInt(uvIndexEl.textContent) && parseInt(uvIndexEl.textContent) < 10) {
        uvIndexEl.className = "very-high";
    } else if (parseInt(uvIndexEl.textContent) > 11) {
        uvIndexEl.className = "extreme";
    }
};










  //Event listeners
  btnEl.addEventListener("click", searchCity);
var searchEl = document.querySelector(".text-input");
var searchFormEl = document.querySelector(".search-form");
var btnEl = document.querySelector(".button");
var fiveDayContainerEl = document.querySelector(".fiveday-container");

// search city function
var searchCity = function (event) {
    event.preventDefault();

    var cityName = searchEl.value.trim();
    if (cityName) {
        fetchCurrent(cityName);
        storeCity(cityName);
        addSearchHistory(cityName);
        fetchFiveDay(cityName);
    }
};


// Create City Array
var storeCity = function (city) {
    citiesArray.push(city);
    cityStorage();
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

// set array to localStorage
var cityStorage = function() {
    localStorage.setItem("city-names", JSON.stringify(citiesArray));
}



// fetch API data for current weather
var fetchCurrent = (city) => {
    var apiCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9488ec8c097fd6f500089eda4c1d7cef";

    fetch(apiCurrent).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCurrent(data);
                fetchUv(data);
            });
        } else {
            alert("Not a valid city name");
        }
    });
};

// Fetch API Data for 5 day forecast
var fetchFiveDay = function(city) {
    var apiFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&APPID=9488ec8c097fd6f500089eda4c1d7cef";
    fetch(apiFive).then(function (response) {
        response.json().then(function(data) {
            displayFive(data);
            console.log(data);
        })
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

//Display 5 day forecast function
var displayFive = function(data) {
    fiveDayContainerEl.textContent = "";
    for (var i = 5; i < 38; i += 8) {
        // create box for 5 day forecast
        var fiveDayBox = document.createElement("div");
        fiveDayBox.className = "fiveday-section";
        fiveDayContainerEl.appendChild(fiveDayBox);

        //reformat date for api data and display
        var fiveDayDate = moment(data.list[i].dt_txt).format('MMMM Do YYYY');
        var fiveDayDateDisplay = document.createElement("h4");
        fiveDayDateDisplay.textContent = fiveDayDate;
        fiveDayBox.appendChild(fiveDayDateDisplay);

        // display 5 day weather icons
        var fiveDayIcon = document.createElement("img");
        fiveDayIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
        fiveDayIcon.setAttribute("class", "fiveday-icon");
        fiveDayBox.appendChild(fiveDayIcon);

        // display 5 day temperature
        var fiveDayTemp = document.createElement("p");
        fiveDayTemp.setAttribute("class", "fiveday-temp");
        fiveDayTemp.textContent = ("Temp: " + data.list[i].main.temp + " F");
        fiveDayBox.appendChild(fiveDayTemp);

        // display 5 day wind speed
        var fiveDayWind = document.createElement("p");
        fiveDayWind.setAttribute("class", "fiveday-wind");
        fiveDayWind.textContent = ("Wind: " + data.list[i].wind.speed + " MPH");
        fiveDayBox.appendChild(fiveDayWind);

        // display 5 day humidity
        var fiveDayHumidity = document.createElement("p");
        fiveDayHumidity.setAttribute("class", "fiveday-humidity");
        fiveDayHumidity.textContent = ("Humidity: " + data.list[i].main.humidity + "%");
        fiveDayBox.appendChild(fiveDayHumidity)
    };
};

// fetch API UV index
var fetchUv = function (data) {
    var apiUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&APPID=9488ec8c097fd6f500089eda4c1d7cef";
    // Fetch API URL
    fetch(apiUv).then(function (response) {
            response.json().then(function (data) {
                displayUv(data);;
            });
    });
};

// Display UV Index
var displayUv = function (data) {
    var uvIndexEl = document.querySelector("#uv-index");
    uvIndexEl.textContent = data.current.uvi;

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
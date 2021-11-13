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

var fetchCurrent = function (city) {
    var apiCall = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=9488ec8c097fd6f500089eda4c1d7cef";

    fetch(apiCall).then(function (response) {
        if(response.ok) {
            response.json().then(function(data) {

                displayCurrent(data);

            })
        }
    });
};









  //Event listeners
  btnEl.addEventListener("click", searchCity);
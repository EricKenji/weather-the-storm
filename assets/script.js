var searchEl = document.querySelector(".text-input");
var searchFormEl = document.querySelector(".search-form");
var btnEl = document.querySelector(".button");

// search city function
var searchCity = function (event) {
    event.preventDefault();

    var cityName = searchEl.value.trim();
    console.log(cityName);
};







  //Event listeners
  btnEl.addEventListener("click", searchCity);
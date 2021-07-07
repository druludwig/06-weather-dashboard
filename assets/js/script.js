// Weather App - Dru Ludwig
let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')
$("#currentTime").text(currentTime)

savedCities()
//Display saved cities
function savedCities(){
$("#search-history-list").text("")
let saveHistory = JSON.parse(localStorage.getItem("savedCities"));
if (saveHistory !== null){
    for (i = 0; i < saveHistory.length; i++) {
        let city = saveHistory[i]
        $("#search-history-list").append(`<li><button type="button" class="button history" id="historyCity${i}" value="${city}">${city}</button></li>`)
    } 
}}

$( ".history" ).click(function(event) {
    let city = event.target.value
    $("#search").attr("value", city);
    $("#headline").text("Current Weather for " + document.getElementById("search").value)
    geoCode()
})

// Wait for user to submit search
$( "#searchButton" ).click(function() {
$("#headline").text("Current Weather for " + document.getElementById("search").value)
saveSearch();
geoCode();
})

//Buttons to view past cities


function saveSearch() {
// Retrieve (if any) saved cities and parse them
let saveHistory = JSON.parse(localStorage.getItem("savedCities"));
if(saveHistory == null) saveHistory = [];
    let search = document.getElementById("search").value;
    localStorage.setItem("search", JSON.stringify(search));
    // Save the list back to local storage
    saveHistory.push(search);
    localStorage.setItem("savedCities", JSON.stringify(saveHistory));
    savedCities()
};

function geoCode(){
let cityEntry = $( "#search" ).val();
let cityEncoded = cityEntry.replace(" ", "%20");
let geocodeQuery = "http://open.mapquestapi.com/geocoding/v1/address?key=9mr2uK3G1XHwPf6mYwHSQ4MpHV4O2aGG&location=" + cityEncoded;
//Send compound URL to geocode API
fetch(geocodeQuery)
.then(function (response) {
    return response.json()
})
//Extract the latitude and longitude
.then(function (data) {
    cityLatitude = (data.results[0].locations[0].displayLatLng.lat)
    cityLongitude = (data.results[0].locations[0].displayLatLng.lng)
    weatherFetch()
    
})}

function weatherFetch(){
let weatherFetchURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&units=imperial&appid=ae481a6848ca13c83166fe955c1d69ca`
fetch(weatherFetchURL)
.then(function (response) {
    return response.json()
    .then(function (data) {
        //Populate the current weather data
        let temp = Math.round(data.current.temp);
        $( "#currentTemp" ).text(`Temperature: ${temp} deg F`);
        let windSpeed = Math.round(data.current.wind_speed);
        $( "#currentWind" ).text(`Wind: ${windSpeed}mph`);
        let humidity = data.current.humidity;
        $( "#currentHumidity" ).text(`Humidity: ${humidity}%`);
        let uv = Math.round(data.current.uvi);
        $( "#currentUV" ).text(`UV Index: ${uv}`);
        // Populate the 5 day forecast <== in v1.1 use FOR loop to clean up
        // 1 Day after today
        let day1header = moment().add(1, 'days').format('dddd')
        $("#day-1-header").text(day1header)
        let day1temp = Math.round(data.daily[1].temp.day)
        $("#day-1-temp").text(`Temp: ${day1temp}°F`)
        let day1wind = Math.round(data.daily[1].wind_speed)
        $("#day-1-wind").text(`Wind: ${day1wind}mph`)
        let day1humidity = Math.round(data.daily[1].humidity)
        $("#day-1-humidity").text(`Humidity: ${day1humidity}%`)
        let day1image = (data.daily[1].weather[0].icon)
        $("#day-1-image").attr("src", `http://openweathermap.org/img/wn/${day1image}@2x.png`)
        let day1text = (data.daily[1].weather[0].description)
        $("#day-1-text").text(day1text)
        //2 Days after today
        let day2header = moment().add(2, 'days').format('dddd')
        $("#day-2-header").text(day2header)
        let day2temp = Math.round(data.daily[2].temp.day)
        $("#day-2-temp").text(`Temp: ${day2temp}°F`)
        let day2wind = Math.round(data.daily[2].wind_speed)
        $("#day-2-wind").text(`Wind: ${day2wind}mph`)
        let day2humidity = Math.round(data.daily[2].humidity)
        $("#day-2-humidity").text(`Humidity: ${day2humidity}%`)
        let day2image = (data.daily[2].weather[0].icon)
        $("#day-2-image").attr("src", `http://openweathermap.org/img/wn/${day2image}@2x.png`)
        let day2text = (data.daily[2].weather[0].description)
        $("#day-2-text").text(day2text)
        //3 Days after today
        let day3header = moment().add(3, 'days').format('dddd')
        $("#day-3-header").text(day3header)
        let day3temp = Math.round(data.daily[3].temp.day)
        $("#day-3-temp").text(`Temp: ${day3temp}°F`)
        let day3wind = Math.round(data.daily[3].wind_speed)
        $("#day-3-wind").text(`Wind: ${day3wind}mph`)
        let day3humidity = Math.round(data.daily[3].humidity)
        $("#day-3-humidity").text(`Humidity: ${day3humidity}%`)
        let day3image = (data.daily[3].weather[0].icon)
        $("#day-3-image").attr("src", `http://openweathermap.org/img/wn/${day3image}@2x.png`)
        let day3text = (data.daily[3].weather[0].description)
        $("#day-3-text").text(day3text)
        //4 Days after today
        let day4header = moment().add(4, 'days').format('dddd')
        $("#day-4-header").text(day4header)
        let day4temp = Math.round(data.daily[4].temp.day)
        $("#day-4-temp").text(`Temp: ${day4temp}°F`)
        let day4wind = Math.round(data.daily[4].wind_speed)
        $("#day-4-wind").text(`Wind: ${day4wind}mph`)
        let day4humidity = Math.round(data.daily[4].humidity)
        $("#day-4-humidity").text(`Humidity: ${day4humidity}%`)
        let day4image = (data.daily[4].weather[0].icon)
        $("#day-4-image").attr("src", `http://openweathermap.org/img/wn/${day4image}@2x.png`)
        let day4text = (data.daily[4].weather[0].description)
        $("#day-4-text").text(day4text)
        //5 Days after today
        let day5header = moment().add(5, 'days').format('dddd')
        $("#day-5-header").text(day5header)
        let day5temp = Math.round(data.daily[5].temp.day)
        $("#day-5-temp").text(`Temp: ${day5temp}°F`)
        let day5wind = Math.round(data.daily[5].wind_speed)
        $("#day-5-wind").text(`Wind: ${day5wind}mph`)
        let day5humidity = Math.round(data.daily[5].humidity)
        $("#day-5-humidity").text(`Humidity: ${day5humidity}%`)
        let day5image = (data.daily[5].weather[0].icon)
        $("#day-5-image").attr("src", `http://openweathermap.org/img/wn/${day5image}@2x.png`)
        let day5text = (data.daily[5].weather[0].description)
        $("#day-5-text").text(day5text)
    })
})
$(".splash").css("visibility", "hidden")
$(".splash").css("position", "fixed")
$("#current-weather").css("display", "block")
}

// Clear button
$("#clearButton").click(function() {
    let clearDay = confirm ("Are you sure you want to clear all saved cities? \n\nREMINDER: If you clear your browser history, you will clear your saved cities unintentionally.")
       if (clearDay){
           localStorage.clear();
           location.reload();
       } 
})


const displayName = document.querySelector("#place-name");
const displayTemp = document.querySelector("#temp");
const displayCondition = document.querySelector("#condition");
const inputForm = document.querySelector(".get-weather");
const placeSearch = inputForm.querySelector(".place-search");
const unitBttn = inputForm.querySelector("#units");

const conditionConverter = {
    1: "wi-tornado",
    2: "wi-thunderstorm",
    3: "wi-hurricane",
    4: "wi-thunderstorm",
    5: "wi-snow",
    6: "wi-sleet",
    7: "wi-sleet",
    8: "wi-rain",
    9: "wi-rain",
    10: "wi-rain",
    11: "wi-showers",
    12: "wi-showers",
    13: "wi-snow",
    14: "wi-snow",
    15: "wi-snow-wind",
    16: "wi-snow",
    17: "wi-hail",
    18: "wi-sleet",
    19: "wi-dust",
    20: "wi-fog",
    21: "wi day-haze",
    22: "wi-smoke",
    23: "wi-strong-wind",
    24: "wi-windy",
    25: "wi-snowflake-cold",
    26: "wi-cloudy",
    27: "wi-night-alt-cloudy",
    28: "wi-day-cloudy",
    29: "wi-night-alt-cloudy",
    30: "wi-day-cloudy",
    31: "wi-night-clear",
    32: "wi-day-sunny",
    33: "wi-night-clear",
    34: "wi-day-sunny",
    35: "wi-rain-mix",
    36: "wi-hot",
    37: "wi-thunderstorm",
    38: "wi-thunderstorm",
    39: "wi-thunderstorm",
    40: "wi-showers",
    41: "wi-snow",
    42: "wi-rain-mix",
    43: "wi-snow",
    44: "wi-cloud",
    45: "wi-storm-showers",
    46: "wi-rain-mix",
    47: "wi-storm-showers",
    3200:"wi-na"
}

let isCelcius = true;

function toggleUnits(){
    const newValue = isCelcius ? "\xB0F" : "\xB0C";
    units.value = newValue;
    isCelcius = !isCelcius;
}

function getWeather(e) {

    e.preventDefault();

    const placeInput = placeSearch.value;
    const unit = isCelcius ? "C" : "F";
    const target = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27${placeInput}%27)%20and%20u='${unit}'&format=json`;

    fetch(target)
        .then(response => response.json())
        .then(data => {
            const dataChannel = data.query.results.channel;

            const temp = dataChannel.item.condition.temp;
            const placeName = dataChannel.location.city + ", " + dataChannel.location.country;
            const conditionCode = dataChannel.item.condition.code;

            displayTemp.textContent = temp + "\xB0" + unit;
            displayName.textContent = placeName;

            console.log(conditionCode);
            if(conditionConverter[conditionCode]){
                displayCondition.classList.add("wi", conditionConverter[conditionCode]);
            } else{
                displayCondition.className = "";
            }
        })
        .catch((err) => {
            console.log("Error Getting Data", err);

            resetDisplay();

            displayName.textContent = "Place not found";
        });
}

function resetDisplay() {
    displayTemp.textContent = "";
    displayName.textContent = "";
    displayCondition.className = "";
}

inputForm.addEventListener("submit", getWeather);
units.addEventListener("click", toggleUnits);
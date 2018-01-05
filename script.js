const displayName = document.querySelector("#place-name");
const displayTemp = document.querySelector("#temp");
const displayCondition = document.querySelector("#condition");
const inputForm = document.querySelector(".get-weather");
const placeSearch = inputForm.querySelector(".place-search");

const conditionConverter = {
    3: "fa-bolt",
    4: "fa-bolt",
    5: "fa-snowflake-o",
    8: "fa-tint",
    9: "fa-tint",
    10: "fa-tint",
    11: "fa-tint",
    12: "fa-tint",
    13: "fa-snowflake-o",
    14: "fa-snowflake-o",
    15: "fa-snowflake-o",
    16: "fa-snowflake-o",
    25: "fa-snowflake-o",
    26: "fa-cloud",
    27: "fa-moon-o",
    28: "fa-cloud",
    29: "fa-cloud",
    30: "fa-cloud",
    31: "fa-moon-o",
    32: "fa-sun-o",
    33: "fa-moon-o",
    34: "fa-sun-o",
    35: "fa-tint",
    36: "fa-sun-o",
    37: "fa-bolt",
    38: "fa-bolt",
    39: "fa-bolt",
    40: "fa-tint",
    41: "fa-snowflake-o",
    42: "fa-snowflake-o",
    43: "fa-snowflake-o",
    44: "fa-cloud",
    45: "fa-bolt",
    46: "fa-snowflake-o",
    47: "fa-bolt"
}


function getWeather(e) {

    e.preventDefault();

    const placeInput = placeSearch.value;
    const target = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text=%27${placeInput}%27)%20and%20u='c'&format=json`;

    fetch(target)
        .then(response => response.json())
        .then(data => {
            const dataChannel = data.query.results.channel;

            const temp = dataChannel.item.condition.temp;
            const placeName = dataChannel.location.city + ", " + dataChannel.location.country;
            const conditionCode = dataChannel.item.condition.code;

            displayTemp.textContent = temp + "C";
            displayName.textContent = placeName;

            console.log(conditionCode);
            if(conditionConverter[conditionCode]){
                displayCondition.classList.add("fa", conditionConverter[conditionCode]);
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
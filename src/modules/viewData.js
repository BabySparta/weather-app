import {fromUnixTime} from "date-fns";

function displayData(obj, name) {
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const feelsLike = document.querySelector('.feelsLike');
    const humidity = document.querySelector('.humidity');
    const windSpd = document.querySelector('.windSpeed');
    const weatherNow = document.querySelector('.weather');
    const time = document.querySelector('.time');

    const current = obj.current;
    const currWeather = current.weather[0];
    console.log(obj);
    displayBackground(currWeather);
    getTime(current.dt, obj.timezone_offset);

    city.textContent = name;
    temp.textContent = current.temp;
    feelsLike.textContent = current.feels_like;
    humidity.textContent = current.humidity;
    windSpd.textContent = current.wind_speed;
    weatherNow.textContent = currWeather.description;
}

function displayBackground(weather) {
    const container = document.querySelector('.current');
    const weatherId = weather.id;
    const firstNum = parseInt(weatherId.toString()[0]);
    if (firstNum === 2) {
        container.style.backgroundImage = "url(./resources/thunderstorm.png)"
    }
    if (firstNum === 3 || firstNum === 5) {
        container.style.backgroundImage = "url(./resources/rainy.jpg)"
    }
    if (firstNum === 6) {
        container.style.backgroundImage = "url(./resources/snowy.jpg)"
    }
    if (weatherId === 800) {
        container.style.backgroundImage = "url(./resources/clear.jpg)"
    }
    if (weatherId === 801 || weatherId === 802) {
        container.style.backgroundImage = "url(./resources/partly-cloudy.jpg)"
    }
    if (weatherId === 803 || weatherId === 804) {
        container.style.backgroundImage = "url(./resources/cloudy.jpg)"
    }
}


function getTime(unix, offset) {
    const currTime = fromUnixTime(unix + offset);
    console.log(currTime);
}

export {
    displayData,
}
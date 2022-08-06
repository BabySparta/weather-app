import {fromUnixTime} from "date-fns";

function displayData(obj, name) {
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const feelsLike = document.querySelector('.feelsLike');
    const humidity = document.querySelector('.humidity');
    const windSpd = document.querySelector('.windSpeed');
    const weatherNow = document.querySelector('.weather');
    const date = document.querySelector('.date');
    const time = document.querySelector('.time');
    const precip = document.querySelector('.pop');
    const desc = document.querySelector('.weatherDesc')

    const current = obj.current;
    const currWeather = current.weather[0];
    console.log(obj);
    displayBackground(currWeather);
    const currentTime = getTime(current.dt, obj.timezone_offset);
    const formTemp = String(current.temp).split('.')[0];
    const formFeels = String(current.feels_like).split('.')[0];

    city.textContent = name;
    temp.textContent = formTemp + "\u00B0F";
    feelsLike.textContent = formFeels + "\u00B0F";
    humidity.textContent = current.humidity + "%";
    windSpd.textContent = current.wind_speed + " m/h";
    weatherNow.textContent = currWeather.main;
    desc.textContent = currWeather.description;
    date.textContent = formatDate(currentTime);
    time.textContent = formatTime(currentTime);
    precip.textContent = obj.daily[0].pop + '%'
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
    const currTime = fromUnixTime(unix + offset).toUTCString();
    return currTime;
}

function formatDate(fullTime) {
    const timeArray = fullTime.split(' ');

    let formDay = timeArray[1];

    if (formDay < 10) {
        formDay = formDay.charAt(1);
    }
    if (formDay.charAt(-1) === 1) {
        formDay = formDay + 'st';
    }
    if (formDay.charAt(-1) === 2) {
        formDay = formDay + 'nd';
    }
    if (formDay.charAt(-1) === 3) {
        formDay = formDay + 'rd';
    } else {
        formDay = formDay + 'th';
    }

    return timeArray[0] + ' ' + timeArray[2] + ' ' + formDay + ' ' + timeArray[3];
}

function formatTime(fullTime) {
    const timeArray = fullTime.split(' ');
    const remSeconds = timeArray[4].split(':');
    const newTime = remSeconds[0] + ':' + remSeconds[1];
    if (remSeconds[0] < 13) {
        if (remSeconds[0] === '00') {
            return '12:' + remSeconds[1] + " AM";
        }
        return newTime + ' AM';
    }
    const formatHours = remSeconds[0] - 12;
    return formatHours + ':' + remSeconds[1] + " PM";
}

export {    
    displayData,
}
import {fromUnixTime} from "date-fns";


// Current Weather
function displayCurrent(obj, name) {
    const city = document.querySelector('.city');
    const temp = document.querySelector('.temp');
    const feelsLike = document.querySelector('.feelsLike');
    const humidity = document.querySelector('.humidity');
    const windSpd = document.querySelector('.windSpeed');
    const weatherNow = document.querySelector('.weather');
    const date = document.querySelector('.date');
    const time = document.querySelector('.time');
    const precip = document.querySelector('.pop');
    const desc = document.querySelector('.weatherDesc');
    const sunrise = document.querySelector('.sunrise');
    const sunset = document.querySelector('.sunset');
    const comp = document.querySelector('.comp');
    const high = document.querySelector('.high');
    const low = document.querySelector('.low');

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
    desc.textContent = "The weather is: " + currWeather.description;
    date.textContent = formatDate(currentTime);
    time.textContent = formatTime(currentTime);
    precip.textContent = obj.daily[0].pop + '%';
    sunrise.textContent = formatTime(getTime(current.sunrise, obj.timezone_offset));
    sunset.textContent = formatTime(getTime(current.sunset, obj.timezone_offset));
    comp.textContent = 'Temperature tommorrow will be ' + compareTommorrow(obj);
    high.textContent = String(obj.daily[0].temp.max).split('.')[0];
    low.textContent = String(obj.daily[0].temp.min).split('.')[0];
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
        if (remSeconds[0] < 10) {
            const remZero = remSeconds[0].charAt(1);
            return remZero + ':' + remSeconds[1] + " AM";
        }
        return newTime + ' AM';
    }
    const formatHours = remSeconds[0] - 12;
    return formatHours + ':' + remSeconds[1] + " PM";
}

function compareTommorrow(obj) {
    const today = obj.daily[0].temp.day;
    const tommorrow = obj.daily[1].temp.day;

    if (Math.abs(today - tommorrow) <= 5) {
        return 'similar to today';
    }
    if (today > tommorrow) {
        return 'colder than today';
    }
    return 'warmer than today';
}


// Hourly Weather

function displayHourly(obj) {
    const futureContainer = document.querySelector('.futureContainer');
    futureContainer.textContent = '';
    makeContainers(24, futureContainer);
    const cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach((cell) => {
        const index = cells.indexOf(cell);
        addHourlyData(index, obj, cell)
    })
}

function makeContainers(amount, cont) {
    for(let i = 0; i < amount; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');

        const time = document.createElement('div');
        time.classList.add('cellTxt');
        const icon = document.createElement('img');
        icon.classList.add('weatherIcon');
        const temp = document.createElement('div');
        temp.classList.add('cellTxt');
        const chanceRain = document.createElement('div');
        chanceRain.classList.add('cellTxt');

        cell.appendChild(time);
        cell.appendChild(icon);
        cell.appendChild(temp);
        cell.appendChild(chanceRain);
        cont.appendChild(cell);
    }
}

function addHourlyData(index, obj, cell) {
    const children = cell.children

    // add time
    const futureTime = obj.hourly[index].dt;
    const formedTime = formatTime(getTime(futureTime, obj.timezone_offset));
    children.item(0).textContent = formedTime;

    // add icon
    const getIcon = obj.hourly[index].weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${getIcon}@2x.png`
    children.item(1).alt = getIcon;
    children.item(1).src = iconSrc;

    // add temp
    const getTemp = obj.hourly[index].temp;
    const formedTemp = String(getTemp).split('.')[0];
    children.item(2).textContent = formedTemp + '\u00B0F';

    // add pop
    const getPop = obj.hourly[index].pop;
    const formedPop = Math.round(getPop);
    children.item(3).textContent = formedPop + '%';
}

// Daily Weather

function displayDaily(obj) {
    const futureContainer = document.querySelector('.futureContainer');
    futureContainer.textContent = '';
    makeContainers(7, futureContainer);
    const cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach((cell) => {
        const index = cells.indexOf(cell);
        addDailyData(index, obj, cell)
    })
}

function addDailyData(index, obj, cell) {
    const children = cell.children

    // add day
    const futureTime = obj.daily[index].dt;
    const formedTime = getTime(futureTime, obj.timezone_offset);
    const day = formedTime.split(',')[0];
    children.item(0).textContent = getFullDay(day);

    // add icon
    const getIcon = obj.daily[index].weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${getIcon}@2x.png`
    children.item(1).alt = getIcon;
    children.item(1).src = iconSrc;

    // add temp
    const getHigh = obj.daily[index].temp.max;
    const getLow = obj.daily[index].temp.min;
    const formedHigh = String(getHigh).split('.')[0];
    const formedLow = String(getLow).split('.')[0];
    children.item(2).textContent = formedLow + ' | ' + formedHigh;

    // add pop
    const getPop = obj.daily[index].pop;
    const formedPop = Math.round(getPop);
    children.item(3).textContent = formedPop + '%';
}

function getFullDay(day) {
    if (day === 'Sun' || day === 'Mon' || day === 'Fri') {return day + 'day'}
    if (day === 'Tue') {return day + 'sday'};
    if (day === 'Wed') {return day + 'nesday'};
    if (day === 'Thu') {return day + 'rsday'};
    if (day === 'Sat') {return day + 'urday'};
}

export {    
    displayCurrent,
    displayHourly,
    displayDaily,
}
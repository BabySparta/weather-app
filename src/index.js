import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

let units = 'imperial';
let city = 'New+York,US';

async function init(place, unit) {
    const location = await api.getWeather(place, unit);
    const city = await api.getCoords(place);
    view.displayCurrent(location, city.name);
    view.displayHourly(location); 

    hourlyBtn.addEventListener('click', () => {
        setActive(hourlyBtn);
        view.displayHourly(location);
    });
    dailyBtn.addEventListener('click', () => {
        setActive(dailyBtn);
        view.displayDaily(location);
    });
}
// Daily and Hourly. Have to keep these out of function or it wont work.
function setActive(btn) {
    hourlyBtn.classList.remove('active');
    dailyBtn.classList.remove('active');
    btn.classList.add('active');
}

const tabs = Array.from(document.querySelectorAll('.tab'));
const hourlyBtn = tabs[0];
const dailyBtn = tabs[1];

// units logic

const checkbox = document.querySelector('.checkbox');
checkbox.addEventListener('change', () => {
    if (units === 'imperial') {
        units = 'metric';
    } else {
        units = 'imperial'
    }
    init(city, units);
})

init(city, units);
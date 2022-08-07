import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

async function init() {
    const location = await api.getWeather('Centreville,us', 'imperial');
    const city = await api.getCoords('Centreville,us');
    view.displayCurrent(location, city.name);
    view.displayHourly(location);
}

const tabs = Array.from(document.querySelectorAll('.tab'));
const hourlyBtn = tabs[0];
const dailyBtn = tabs[1];

function setActive(btn) {
    hourlyBtn.classList.remove('active');
    dailyBtn.classList.remove('active');
    btn.classList.add('active');
}

hourlyBtn.addEventListener('click', () => {
    setActive(hourlyBtn);
    view.displayHourly();
});
dailyBtn.addEventListener('click', () => {
    setActive(dailyBtn);
    view.displayDaily();
});

init();
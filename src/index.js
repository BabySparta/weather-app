import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

async function init() {
    const location = await api.getWeather('London,uk');
    const city = await api.getCoords('London,uk');
    view.displayData(location, city.name);
}

init();
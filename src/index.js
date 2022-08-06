import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

async function init() {
    const location = await api.getWeather('Miami');
    const city = await api.getCoords('Miami');
    view.displayData(location, city.name);
}

init();
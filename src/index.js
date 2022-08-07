import * as api from "./modules/weatherData";
import * as view from "./modules/viewData";

async function init() {
    const location = await api.getWeather('Centreville,us');
    const city = await api.getCoords('Centreville,us');
    view.displayData(location, city.name);
}

init();

setInterval(function (){init()}, 60000);
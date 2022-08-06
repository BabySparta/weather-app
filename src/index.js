import * as api from "./modules/weatherData";

async function init() {
    const test = await api.getWeather('London');
    console.log(test);
}

init();
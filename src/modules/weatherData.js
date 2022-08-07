// My ID: 07d6d743abf155d07011e87ead210d57

async function getCoords(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=28fe7b5f9a78838c639143fc517e4343`, {mode: 'cors'});
    const data = await response.json();
    return data;
}

async function getForecast(long, lat, units) {
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${long}&lon=${lat}&exclude=minutely,alerts&units=${units}&appid=28fe7b5f9a78838c639143fc517e4343`);
    return await forecast.json();
}

async function getWeather(location, units) {
    const coords = await getCoords(location);
    return await getForecast(coords.coord.lat, coords.coord.lon, units);
}

export {
    getWeather,
    getForecast,
    getCoords,
}
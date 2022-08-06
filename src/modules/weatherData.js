async function getCoords(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=07d6d743abf155d07011e87ead210d57`, {mode: 'cors'});
    const data = await response.json();
    return data;
}

async function getForecast(long, lat, units) {
    const forecast = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely,alerts&units=${units}&appid=07d6d743abf155d07011e87ead210d57
    `);
    return await forecast.json();
}

async function getWeather(location) {
    const coords = await getCoords(location);
    console.log(coords);
    return await getForecast(coords.coord.lat, coords.coord.lon, 'imperial');
}

export {
    getWeather,
    getForecast,
    getCoords,
}
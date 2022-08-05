async function getWeather() {
    const data = await fetch('http://api.openweathermap.org/data/2.5/weather?q=London&APPID=117477229a39f9e49ca3f88071e2c038', {mode: 'cors'});
    console.log(data);
}

//getWeather()
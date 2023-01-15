const Api_Key = '0d924cd3489de7a27b383e21977dc9cc';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${Api_Key}`)
    .then(Response => Response.json())
    .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data);
    const justWeather = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(justWeather).forEach( key => {
        document.getElementById(key).textContent = justWeather[key];
    })

    cleanUp();
}

const cleanUp = () => {
    let contenedor = document.getElementById('contenedor');
    let load = document.getElementById('load');

    load.style.display = 'none';
    contenedor.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${('0' + (date.getMonth() +1)).slice(-2)}-${date.getFullYear()}`;
}

const getClima = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}

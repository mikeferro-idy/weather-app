
async function loadWeather (city = 'London') {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=74991bb5da4c78cee1d1779cf899effb`, {mode: 'cors'})
        const weatherData = await response.json();
        console.log(weatherData);
        drawWeather( weatherData );
    }
    catch (error) {
        console.error('Error12', error);
        showError('Error: city not found');
    }
}

function drawWeather ( d ){
    const locationContainer = document.querySelector('.location-container');
    const timeContainer = document.querySelector('.time-container');
    const tempContainer = document.querySelector('.temp-container');
    const weatherContainer = document.querySelector('.weather-container');
    const weatherIcon = document.querySelector('ion-icon');


    const today = new Date();
    const time = today.getHours() + ':' + today.getMinutes(); 
    const location = d.name;
    const temp = Math.round(d.main.temp);
    const weather = d.weather[0].main;
    
    locationContainer.textContent = location;
    timeContainer.textContent = time;
    tempContainer.innerHTML = temp + '&deg;';
    weatherContainer.textContent = weather;
    weatherIcon.setAttribute('name',iconSelector(weather));
}

function iconSelector ( weather ) {
    switch (weather) {
        case 'Clouds':
            return 'cloud-outline';
        case 'Clear':
            return 'sunny-outline';
        case 'Snow':
            return 'snow-outline';
        case 'Rain':
            return 'rainy-outline';
        default:
            return 'happy-outline';
    }
}

function showError( msg ) {
    const error = document.querySelector('.error')
    error.className = 'error active';
    error.textContent = msg;
}

const viewController = (() => {
    const form = document.querySelector('form');
    const location = document.querySelector('#city-search');

    loadWeather("Idyllwild");

    form.addEventListener('submit', (e) => {
        console.log(location.value);
        loadWeather(location.value);
        e.preventDefault();
    })
    

    // loadWeather('Asheville, North Carolina');

})();

// /[a-zA-Z]+, [a-zA-z]+/gm
// /^[a-zA-Z, ]+$/mg

async function loadWeather (city = 'London') {
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=74991bb5da4c78cee1d1779cf899effb`, {mode: 'cors'})
        const weatherData = await response.json();
        console.log(weatherData);
        drawWeather( weatherData );
    }
    catch (error) {
        console.error('Error12', error);
    }
}

function drawWeather ( d ){
    const locationContainer = document.querySelector('.location-container');
    const tempContainer = document.querySelector('.temp-container');
    const weatherContainer = document.querySelector('.weather-container');
    const weatherIcon = document.querySelector('ion-icon');

    const location = d.name;
    const temp = Math.round(d.main.temp);
    const weather = d.weather[0].main;
    
    locationContainer.textContent = location;
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
        default:
            return 'happy-outline';
    }
}

const viewController = (() => {
    const form = document.querySelector('form');
    const location = document.querySelector('#city-search');

    form.addEventListener('submit', (e) => {
        console.log(location.value);
        loadWeather(location.value);
        e.preventDefault();
    })
    

    // loadWeather('Asheville, North Carolina');

})();
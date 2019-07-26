// Elements
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const infoBar = document.querySelector('#info-bar')
const weatherInfoSection = document.querySelector('#weather-info-section')
const weatherIcon = document.querySelector('#weather-icon')
const temperature = document.querySelector('#temperature')
const myLocation = document.querySelector('#location')
const condition = document.querySelector('#condition')
const forecast = document.querySelector('#forecast')
const humidity = document.querySelector('#humidity')
const highTemp = document.querySelector('#high-temp')
const lowTemp = document.querySelector('#low-temp')
const sunrise = document.querySelector('#sunrise')
const sunset = document.querySelector('#sunset')

// Function
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = search.value
    infoBar.textContent = 'Loading...'
    fetch(`https://api.apixu.com/v1/forecast.json?key=60fea3afb81d4525af5191836192307&q=${city}`).then((response) => {
        if (response.status === 400) {
            infoBar.textContent = 'Location not found. Please use a valid city or zip code.'
        } else {
            response.json().then((data) => {
                infoBar.textContent = ''
                weatherIcon.setAttribute('src', data.current.condition.icon)
                temperature.textContent = data.current.temp_f + '°F'
                myLocation.textContent = data.location.name + ', ' + data.location.region
                condition.textContent = data.current.condition.text
                forecast.textContent = data.forecast.forecastday[0].day.condition.text
                humidity.textContent = data.current.humidity + '%'
                highTemp.textContent = data.forecast.forecastday[0].day.maxtemp_f + '°F'
                lowTemp.textContent = data.forecast.forecastday[0].day.mintemp_f + '°F'
                sunrise.textContent = data.forecast.forecastday[0].astro.sunrise
                sunset.textContent = data.forecast.forecastday[0].astro.sunset
                weatherInfoSection.classList.remove('hidden')
            })
        }
    })
})
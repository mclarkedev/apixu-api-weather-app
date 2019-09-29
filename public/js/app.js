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
    fetch(`http://api.weatherstack.com/current?access_key=199144c0e4f17bb3ac394f8a2cb1597c&query=${city}&units=f&forecast_days=1`)
        .then((response) => {
            if (response.status === 400) {
                infoBar.textContent = 'Location not found. Please use a valid city or zip code.'
            } else {
                response.json().then((data) => {
                    infoBar.textContent = ''
                    weatherIcon.setAttribute('src', data.current.weather_icons[0])
                    temperature.textContent = data.current.temperature + '°F'
                    myLocation.textContent = data.location.name + ', ' + data.location.region
                    condition.textContent = data.current.weather_descriptions
                    humidity.textContent = data.current.humidity + '%'
                    weatherInfoSection.classList.remove('hidden')
                })
            }
        })
})
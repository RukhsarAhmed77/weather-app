// Select DOM elements
const weather = document.getElementById("weather");
const city = document.getElementById("city");

function getWeather() {
    if (!city.value.trim()) {
        weather.innerHTML = `<p>Please enter a city name.</p>`;
        return;
    }

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=4eb077235b6590468091b3ec816da3ac&units=metric`
    ).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        

        const weatherCondition = data.weather[0].main.toLowerCase();
        const weatherImages = {
            clear: "sun.png",
            clouds: "cloudy.png",
            rain: "rainy.png",
            snow: "snow.png",
            thunderstorm: "thunderstorm.png",
            drizzle: "drizzle.png",
            haze: "haze.png",
            default: "default_weather.png",
        };

        const weatherImage = weatherImages[weatherCondition] || weatherImages.default;

        weather.innerHTML = `
        <h1 class="temp">${Math.round(data.main.temp)}°C</h1>
        <img src="${weatherImage}" alt="${data.weather[0].main}" class="weather-icon">
        <div class="mid">
            <p>Place: ${data.name}</p>
            <p>Weather: ${data.weather[0].main}</p>
            <p>Wind Speed: ${data.wind.speed} km/h</p>
            <p>Humidity: ${data.main.humidity}%</p>
        </div>
        `;
    }).catch(function (error) {
        Swal.fire({
            icon: "warning",
            title: "Oops! Something went wrong. Check the city name!",
            showConfirmButton: false,
            timer: 3500,
        });
        weather.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

function checkEnter(event) {
    if (event.key === "Enter") {
      getWeather();
    }
  }
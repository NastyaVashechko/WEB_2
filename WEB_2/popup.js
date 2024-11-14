document.getElementById("reload").addEventListener("click", getWeather);

function getWeather() {
  // Отримання поточної геолокації користувача
  navigator.geolocation.getCurrentPosition(success, error);

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Використовуємо OpenWeatherMap API для отримання даних
    const apiKey = 'c92ca7796ce9ee23be65a7eebbf72498';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        document.getElementById("weather-info").innerHTML = `
          <h2>${data.name}</h2>
          <p>${data.weather[0].description}</p>
          <p>${data.main.temp} °C</p>
        `;
      })
      .catch(() => {
        document.getElementById("weather-info").innerHTML = "<p>Weather data not available.</p>";
      });
  }

  function error() {
    document.getElementById("weather-info").innerHTML = "<p>Unable to retrieve location.</p>";
  }
}

// Завантажуємо погоду при першому відкритті
getWeather();

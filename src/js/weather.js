document.addEventListener("DOMContentLoaded", function() {
  updateWeather("Buenos Aires");
});

async function updateWeather(city) {
  const url = `https://open-weather13.p.rapidapi.com/city/${city}&lang=es`;
  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': '1b1445992amsh902da3e2766c4b2p1ec77ejsn8b8d21c3bbbe',
          'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);
      const data = await response.json();
      
      const weatherInfo = document.getElementById("weather-info");
      if (data && data.weather) {
          const weatherDescription = data.weather[0].description;
          const tempFahrenheit = data.main.temp;
          const tempCelsius = (tempFahrenheit - 32) * 5 / 9;
          weatherInfo.textContent = `En ${data.name}, la temperatura es de ${tempCelsius.toFixed(1)}°C. con ${weatherDescription}.`;
      } else {
          weatherInfo.textContent = "Información del clima no disponible.";
      }
  } catch (error) {
      console.error("Error obteniendo información del clima:", error);
      alert("Error obteniendo información del clima.");
  }
}
function actualizarClima() {
  const cityInput = document.getElementById("city").value;
  updateWeather(cityInput);
}
const apiKey = '991ed5f309e86ed286c9166b229fe7f4'; // Reemplaza esto con tu propia API key de OpenWeatherMap

const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
  const cityName = cityInput.value;
  if (cityName) {
    getWeather(cityName);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      alert("Process data, enter please");
      weatherInfo.innerHTML = `<p >Weather ${weatherDescription}</p><p>Temperature: ${temperature}°C</p>`;
      weatherInfo.style.color = "white";
      weatherInfo.style.fontFamily = "monospace";
      weatherInfo.style.transition = " 3s"
    } else {
      weatherInfo.innerHTML = `<p>Error in obtaining the climate for ${city}</p>`;
      weatherInfo.style.color = "orange";

    }
  } catch (error) {
    console.error('Error al obtener datos del clima', error);
    weatherInfo.innerHTML = `<p>Error in obtaining climate data for ${city}</p>`;
  }
}

const textElement = document.getElementById("text");

function Wordsanimations() {
  const text = textElement.innerText;
  textElement.innerText = "";

  let i = 0;
  function Letters() {
    if (i < text.length) {
      textElement.innerHTML += text.charAt(i);
      i++;
      setTimeout(Letters, Math.floor(Math.random() * 50) + 30); // Adjust typing speed here
    }
  }

  Letters();
}

Wordsanimations();

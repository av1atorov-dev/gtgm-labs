const apiKey = "YOUR_API_KEY_HERE";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  document.getElementById("city").innerText = data.name;
  document.getElementById("temp").innerText = data.main.temp + " °C";
  document.getElementById("desc").innerText = data.weather[0].description;

  changeBackground(data.weather[0].main);
}

function changeBackground(weather) {
  const body = document.body;

  body.classList.remove("sunny", "rainy", "cloudy");

  if (weather === "Clear") {
    body.classList.add("sunny");
  } else if (weather === "Rain") {
    body.classList.add("rainy");
  } else {
    body.classList.add("cloudy");
  }
}
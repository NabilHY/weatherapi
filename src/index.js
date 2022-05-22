import './style.css';

const searchIcon = document.querySelector('.search-icon');
const searchInput = document.getElementById('city-name');
const x = document.getElementsByTagName('BODY')[0];

const weather = {
  fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a2636f6f072c72aeb3f7c2b0ce494285&units=metric`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    this.renderHTML(name, icon, description, temp, humidity, speed);
  },
  renderHTML(name, icon, desc, temp, humid, speed) {
    const section = document.querySelector('.content');
    section.innerHTML = '';
    section.innerHTML = `
    <h2>${name}</h2>
    <h3>${Math.floor(temp)}°C</h3>
    <img src = "http://openweathermap.org/img/wn/${icon}@2x.png"></img>
    <p>${desc}</p>
    <p>Humidity: ${humid}%</p>
    <p>Wind Speed: ${speed}km/h</p>
    `;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  weather.fetchWeather('tetouan');
  x.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?tetouan')";
});

searchIcon.addEventListener('click', () => {
  const city = searchInput.value;
  weather.fetchWeather(city);
  x.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${city}')`;
  searchInput.value = '';
});

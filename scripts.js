const nameElement = document.getElementById('name')
const tempElement = document.getElementById('temp')
const mainElement = document.getElementById('main')
const descElement = document.getElementById('desc')
const searchButton = document.getElementById('search-button')
const searchBar = document.getElementById('search-bar')


async function getWeather(city) {
    const apiKey = "1b5148ce2b26ec158cbc87c179c39564"
  const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q='
    + city
    + '&units='
    +'metric' 
    + '&APPID=' 
    + apiKey,
    {mode: 'cors'});
  const data = await response.json();
  renderWeather(data)
}
getWeather("london")

function renderWeather(data) {
    const { name } = data;
    const { main, description } = data.weather[0];
    const { temp } = data.main;
    nameElement.innerText = name;
    tempElement.innerText = Math.round(temp) + '°';
    mainElement.innerText = main;
    descElement.innerText = description[0].toUpperCase() + description.slice(1);
    let imageSearchName = name.replace(/\s+/g, '');
    document.body.style.backgroundImage = 'url(https://source.unsplash.com/1600x900?' + imageSearchName + ')';
    console.log(name, main, description, temp);
}

function search() {
    getWeather(searchBar.value)
}

searchButton.addEventListener('click', function() {
    search()
})

searchBar.addEventListener('keyup', function(e) {
    if (e.key =='Enter') {
        search()
    }})


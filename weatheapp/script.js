const search = async () => {
  const city = document.getElementById('city').value;

  if (!city) {
    alert("Enter the city");
    return;
  }
  const api = '7bc5002cf44bf28ebf6efc4b48037153';
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`);
  const data = await response.json();
  console.log(data);

  const forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}`);
  const forecastData = await forecast.json();
  console.log(forecastData);

  current(data);
};

const current = (data) => {
  const temperatureElem = document.getElementById('temp');
  const descriptionElem = document.getElementById('desc');
  const cityElem = document.getElementById('place'); 
  const countryElem = document.getElementById('country');
  const windElem = document.getElementById('wind');
  const icon = document.getElementById('icon')
  if (data.cod === 404) {
    alert('Data not found. Try again later.');
  }

  if (data.cod === 200) {
    const city = data.name;
    const country = data.sys?.country;
    const temperature = Math.round(data.main.temp - 273.15);
    const desc = data.weather[0].description;
    const wind = data.wind?.speed;
    const icons = data.weather[0].icon
    
    const temperatureHTML = `<p>${temperature} C </p>`;
    const cityHTML = `<p>${city}</p>`;
    const descHTML = `<p>${desc}</p>`;
    const countryHTML = `<p>${country}</p>`;
    const windHTML = `<p>${wind}</p>`;


    const img =  `https://openweathermap.org/img/wn/${icons}@4x.png`



    icon.src = img
    temperatureElem.innerHTML = temperatureHTML;
    descriptionElem.innerHTML = descHTML;
    cityElem.innerHTML = cityHTML;
    countryElem.innerHTML = countryHTML;
    windElem.innerHTML = windHTML;
  }
};

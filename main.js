const api = {
	key: "9eab5c5569384248d891e7eabd46d9ab",
	base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
	if(evt.keyCode == 13){
		getResults(searchbox.value);
    document.querySelector('.weather').style.display ="block";
	}
}

function getResults(query){
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
  .then(weather => {
    return weather.json();
  }).then(displayResults);
}

function displayResults (weather){
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;
  
  let now = new Date();
  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);
  
  let temp = document.querySelector('.current .temp');
  temp.innerText = `${Math.round(weather.main.temp)}°c`;
  
  let weather_el = document.querySelector('.current .weather');
  weather_el.innerText = weather.weather[0].main;

  if(weather_el.textContent == 'Haze'){
    document.querySelector('#bg').style.backgroundImage = "url('haze.jpg')";
  } else if(weather_el.textContent == 'Clear'){
    document.querySelector('#bg').style.backgroundImage = "url('bg.jpg')";
  } else if(weather_el.textContent == 'Clouds'){
    document.querySelector('#bg').style.backgroundImage = "url('clouds.jpg')";
  }
   else if(weather_el.textContent == 'Rain'){
    document.querySelector('#bg').style.backgroundImage = "url('rain.jpg')";
  }
   else if(weather_el.textContent == 'Snow'){
    document.querySelector('#bg').style.backgroundImage = "url('snow.jpg')";
  }
   else if(weather_el.textContent == 'Thunderstorm'){
    document.querySelector('#bg').style.backgroundImage = "url('thunder.jpg')";
  }
    else if(weather_el.textContent == 'Smoke'){
    document.querySelector('#bg').style.backgroundImage = "url('smoke.jpg')";
  }

  if(weather_el.textContent == 'Clear'){
    document.querySelector('#img').style.backgroundImage = "url('clear.png')";
  } else if(weather_el.textContent == 'Haze'){
    document.querySelector('#img').style.backgroundImage = "url('haze.png')";
  } else if(weather_el.textContent == 'Rain'){
    document.querySelector('#img').style.backgroundImage = "url('rain.png')";
  } else if(weather_el.textContent == 'Clouds'){
    document.querySelector('#img').style.backgroundImage = "url('cloud.png')";
  } else if(weather_el.textContent == 'Snow'){
    document.querySelector('#img').style.backgroundImage = "url('snow.png')";
  } else if(weather_el.textContent == 'Thunderstorm'){
    document.querySelector('#img').style.backgroundImage = "url('thunder.png')";
  } else if(weather_el.textContent == 'Smoke'){
    document.querySelector('#img').style.backgroundImage = "url('smoke.png')";
  }
  
  let hilow = document.querySelector('.hig-low');
hilow.innerText = `Low - ${Math.round(weather.main.temp_min)}°c / High - ${Math.round(weather.main.temp_max)}°c`;
}


function dateBuilder (d){
  let months = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
  
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  
  return `${day} ${date}th ${month}, ${year}`;
}
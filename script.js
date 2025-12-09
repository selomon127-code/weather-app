const apikey = "cf60b69594f2f07ab049f00051a5ade0";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiurl + city + `&appid=${apikey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        return; // Stop execution if city not found
    } else {
      
    

    const data = await response.json();


    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";

    
    const condition = data.weather[0].main;
    if(condition == "Clouds"){
        weatherIcon.src = "hot.png";
    } else if(condition == "Clear"){
        weatherIcon.src = "hoy1.png";
    } else if(condition == "Rain"){
        weatherIcon.src = "frezz.png";
    } else if(condition == "Drizzle"){
        weatherIcon.src = "cloud.png";
    } else if(condition == "Mist"){
        weatherIcon.src = "rain.png";
    } else {
        weatherIcon.src = "default.png"; // fallback icon
    }

       document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
}
}

searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() === "") {
        alert("Please enter a city name!");
        return;
    }
    checkWeather(searchBox.value);
});

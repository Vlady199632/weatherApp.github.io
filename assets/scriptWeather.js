/**
 *variables
 */
let submit = document.getElementById("btn-submit");
let form = document.getElementById("myForm");
let input = document.getElementById("location-city");
let celsius = document.getElementById("celsius");
let kyiv = "Kyiv";

/**
 * animation of sections
 */
function animat () {
    const section1 = document.getElementById("section1");
    const section2 = document.getElementById("section2");
    section1.classList.add("animationView");
    section2.classList.add("animationView");
}
/**
 * view clock on screen
 */
setInterval(() => {
    let date = new Date();
    let clock = document.getElementById("date");
    clock.innerHTML = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+"<br>"+date.toLocaleDateString();
},1000)
/**
 * searching weather in some city
 */
form.addEventListener("submit", (event) =>{
    event.preventDefault();
    const formData = new FormData(event.target);
    const city = formData.get("city");
    console.log(city);
    fetchCityData(city);
    fetchingHourlyData(city);
    animat();
    input.value = "";
})
/**
 *fetching data from server for current weather
 */
function fetchCityData (cityName) {
    const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?q="+  cityName +"&appid=0b1897b1a29e465c06532284cb64b2ce&units=metric&lang=ua";
    let currentData;
    // Делаем запрос пользователя с данным ID
    axios.get(currentWeatherUrl)
        .then(response => {
            currentData = response.data;
            console.log(currentData);
            displayCurrentData(currentData);
        })
        .catch( (error) => {
            console.log(error);
            input.classList.add("error");
            setTimeout(()=>{
                input.classList.remove("error");
            },1000)
        })
        return currentData;
    }
/**
 *fetching data from server for hourly weather
 */
function fetchingHourlyData (cityName) {
    const hourlyWeatherUrl =  "https://api.openweathermap.org/data/2.5/forecast?q="+  cityName +"&appid=0b1897b1a29e465c06532284cb64b2ce&units=metric&lang=ua";
    let hourlyData;
    axios.get(hourlyWeatherUrl)
        .then(res => {
            hourlyData = res.data;
            console.log(hourlyData);
            displayHourlyData(hourlyData);
        })
        .catch((error) => {
            console.log(error);
        })
        return hourlyData;
    }
/**
 * default weather on screen
 */
fetchCityData(kyiv);
fetchingHourlyData(kyiv);
/**
 *Taking and displaying data for curren weather
 */
function displayCurrentData (data) {
    let imgUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    document.getElementById("temp").innerText = data.main.temp + " " + celsius.textContent;
    document.getElementById("max-temp").innerText =  data.main.temp_max + " " +celsius.textContent;
    document.getElementById("min-temp").innerText = data.main.temp_min+ " " +celsius.textContent;
    document.getElementById("wind-speed").innerText = data.wind.speed+ " km/h";
    document.getElementById("city-name").innerHTML = data.name;
    document.getElementById("sun").innerHTML = data.weather[0].main;
    document.getElementById("sun-img").src = imgUrl;
}
/**
 * Taking and displaying data for hourly weather
 */
function displayHourlyData (data) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date();
    let day = days[d.getDay()];
    let imgUrl = [`http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`,
        `http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png`,
        `http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png`,
        `http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png`,
        `http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`,
        `http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png`
    ]
    /**
     *Картинки погодинно
     */
    document.getElementById("day").textContent = day;
    document.getElementById("hourly-img-Seven").src =imgUrl[0];
    document.getElementById("hourly-img-Ten").src =imgUrl[1];
    document.getElementById("hourly-img-onePm").src =imgUrl[2];
    document.getElementById("hourly-img-threePm").src =imgUrl[3];
    document.getElementById("hourly-img-sixPm").src =imgUrl[4];
    document.getElementById("hourly-img-ninePm").src =imgUrl[5];
    /**
     * Forecast погодинно
     */
    document.getElementById("hourly-forecast-Seven").innerText = data.list[0].weather[0].main;
    document.getElementById("hourly-forecast-ten").innerText = data.list[1].weather[0].main;
    document.getElementById("hourly-forecast-onePm").innerText = data.list[2].weather[0].main;
    document.getElementById("hourly-forecast-threePm").innerText = data.list[3].weather[0].main;
    document.getElementById("hourly-forecast-sixPm").innerText = data.list[4].weather[0].main;
    document.getElementById("hourly-forecast-ninePm").innerText = data.list[5].weather[0].main;
    /**
     * температура на дану годину
     */
    document.getElementById("hourly-temp-Seven").innerText = data.list[0].main.temp + celsius.textContent;
    document.getElementById("hourly-temp-ten").innerText = data.list[1].main.temp + celsius.textContent;
    document.getElementById("hourly-temp-onePm").innerText = data.list[2].main.temp + celsius.textContent;
    document.getElementById("hourly-temp-threePm").innerText = data.list[3].main.temp + celsius.textContent;
    document.getElementById("hourly-temp-sixPm").innerText = data.list[4].main.temp + celsius.textContent;
    document.getElementById("hourly-temp-ninePm").innerText = data.list[5].main.temp + celsius.textContent;
    /**
     * Швидкість вітру на дану годину
     */
    document.getElementById("hourly-windSpeed-Seven").innerText = data.list[0].wind.speed + " km/h";
    document.getElementById("hourly-windSpeed-ten").innerText = data.list[1].wind.speed + " km/h";
    document.getElementById("hourly-windSpeed-onePm").innerText = data.list[2].wind.speed + " km/h";
    document.getElementById("hourly-windSpeed-threePm").innerText = data.list[3].wind.speed + " km/h";
    document.getElementById("hourly-windSpeed-sixPm").innerText = data.list[4].wind.speed + " km/h";
    document.getElementById("hourly-windSpeed-ninePm").innerText = data.list[5].wind.speed + " km/h";
    /**
     * Час з кроком в 3 години
     */
    document.getElementById("time0").innerText = data.list[0].dt_txt.slice(10,16);
    document.getElementById("time1").innerText = data.list[1].dt_txt.slice(10,16);
    document.getElementById("time2").innerText = data.list[2].dt_txt.slice(10,16);
    document.getElementById("time3").innerText = data.list[3].dt_txt.slice(10,16);
    document.getElementById("time4").innerText = data.list[4].dt_txt.slice(10,16);
    document.getElementById("time5").innerText = data.list[5].dt_txt.slice(10,16);
}

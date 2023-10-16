let cityInput = document.querySelector(".city");
let day = document.querySelector(".day");
let date_year = document.querySelector(".date");
let time = document.querySelector(".time");
let temperature = document.querySelector(".temperature");
let maxTemp = document.querySelector(".maxtemp");
let minTemp = document.querySelector(".mintemp");
let windSpeed = document.querySelector(".windspeed");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let sunriseTime = document.querySelector(".sunrisetime");
let sunsetTime = document.querySelector(".sunsettime");
let weatherStatus = document.querySelector(".weatherstatus");
let image = document.querySelector(".image");





cityInput.addEventListener("keyup", showWeather);

function showWeather(e){

     if(e.keyCode === 13){
        let city = cityInput.value;
        console.log(city.length);
        if (city.length > 13) {
            cityInput.style.fontSize = '25px';
        }
   
        let xml = new XMLHttpRequest();
        xml.open(
            "GET",
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b85328ac98ec2b89c1f108d264d66866&units=metric`
        );
        xml.onreadystatechange = function(){
            if(xml.readyState === 4 && xml.status === 200){
                displayResult(JSON.parse(xml.responseText));
            }
        };
        xml.send();
     }
}




function displayResult(data){
    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset ;

    let utcTime = utc + 1000*data.timezone;
    let newCity = new Date(utcTime);

    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset * 1000).getHours();

    msunrise<10 ? (msunrise = `0${msunrise}`) : (msunrise = msunrise);
    msunset<10 ? (msunset = `0${msunset}`) : (msunset = msunset);
    hsunrise<10 ? (hsunrise = `0${hsunrise}`) : (hsunrise = hsunrise);
    hsunset<10 ? (hsunset = `0${hsunset}`) : (hsunset = hsunset);

    //console.log(hsunrise, msunrise);

    let cityHour = newCity.getHours();
    let cityMinute = newCity.getMinutes();
    cityHour<10 ? (cityHour = `0${cityHour}`) : (cityHour = cityHour);
    cityMinute<10 ? (cityMinute = `0${cityMinute}`) : (cityMinute = cityMinute);
    

    time.innerHTML = `${cityHour}:${cityMinute} h`;

    temperature.innerHTML = `${Math.round(data.main.temp)} &deg; C`;
    maxTemp.innerHTML = `Max: ${Math.round(data.main.temp_max)} &deg; C`;
    minTemp.innerHTML = `Min: ${Math.round(data.main.temp_min)} &deg; C`;
  //  console.log(data);
    windSpeed.innerHTML = `${data.wind.speed} Km/h`;
    humidity.innerHTML = `${data.main.humidity} %`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
    sunriseTime.innerHTML = `${hsunrise}: ${msunrise} h`;
    sunsetTime.innerHTML = `${hsunset}: ${msunset} h`;
    weatherStatus.innerHTML = `Weather status : ${data.weather[0].description}`;


    let currentStatus = data.weather[0].description;

    if(currentStatus.includes("clear sky")){
        image.setAttribute("src", "css/sun.png");
    }else if(currentStatus.includes("few clouds")){
        image.setAttribute("src", "css/few-clouds.png");
    }else if(currentStatus.includes("broken clouds")){
        image.setAttribute("src", "css/broken-clouds.png");
    }else if(currentStatus.includes("mist")){
        image.setAttribute("src", "css/mist.png");
    }else if(currentStatus.includes("rain")){
        image.setAttribute("src", "css/rain.png");
    }else if(currentStatus.includes("scattered clouds")){
        image.setAttribute("src", "css/scattered-clouds.png");
    }else if(currentStatus.includes("snow")){
        image.setAttribute("src", "css/snow.png");
    }else if(currentStatus.includes("thunderstorm")){
        image.setAttribute("src", "css/thunderstorm.png");
    }else if(currentStatus.includes("shower rain")){
        image.setAttribute("src", "css/shower-rain.png");
    }else if(currentStatus.includes("overcast clouds")){
        image.setAttribute("src", "css/broken-clouds.png");
    }

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    let months = ["January","February", "March", "April", "May", "June", "july", "August","September","October","November","December"];
    day.innerHTML = days[newCity.getDay()];
    date_year.innerHTML = `${months[newCity.getMonth()]} ${newCity.getUTCDate()},${newCity.getFullYear()}`;
}

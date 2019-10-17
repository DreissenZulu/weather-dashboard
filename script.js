const apiKey = "0765d126b0f6a7eb158764d733ae5823";
var currWeatherDiv = $("#currentWeather");
var forecastDiv = $("#weatherForecast");

function returnCurrentWeather(cityName) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(queryURL).then(function(response){
        let currTime = new Date(response.dt*1000);
        let weatherIcon = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`;
        
        currWeatherDiv.html(`
        <h2>${response.name} (${currTime.getMonth()}/${currTime.getDate()}/${currTime.getFullYear()}) <img src=${weatherIcon} height="70px"></h2>
        <p>Temperature: ${response.main.temp} &#176;C</p>
        <p>Humidity: ${response.main.humidity}%</p>
        <p>Wind Speed: ${response.wind.speed} m/s</p>
        `)
    })
};

function returnWeatherForecast(cityName) {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(queryURL).then(function(response){
        let forecastInfo = response.list;
        forecastDiv.empty();
        $.each(forecastInfo, function(i) {
            if (!forecastInfo[i].dt_txt.includes("12:00:00")) {
                return;
            }
            let forecastDate = new Date(forecastInfo[i].dt*1000);
            let weatherIcon = `http://openweathermap.org/img/wn/${forecastInfo[i].weather[0].icon}.png`;
            console.log(forecastInfo[i].weather[0].icon)


            forecastDiv.append(`
            <div class="col-md">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h4>${forecastDate.getMonth()}/${forecastDate.getDate()}/${forecastDate.getFullYear()}</h4>
                        <img src=${weatherIcon} alt="Icon">
                        <p>Temp: ${forecastInfo[i].main.temp} &#176;C</p>
                        <p>Humidity: ${forecastInfo[i].main.humidity}%</p>
                    </div>
                </div>
            </div>
            `)
        })
    })
};


      const getWeather = async (event) => {
        event.preventDefault();
        const apiKey = "3ab2e62326817a09b2134e92ad2d3a83"
        const cityInput = document.getElementById('cityName');
        let city;

        if(cityInput) {
          city = cityInput.value
          // console.log(city);
        } else {
          console.log('City name not found');
          return;
        }

        function getCurrentDate() {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  const today = new Date();
  return today.toLocaleDateString('en-US', options);
}

        try {
          const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`,
        {
          method: "GET",
          headers: {},
        }
      )
        if(!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const weather = await response.json()
        // console.log('City:', city);
        // console.log('Weather name:', weather.name);
        //  console.log(weather);

        // if (city == weather.name) {
        //   throw new Error (`Sorry, we couldn't find information for ${city}. Please check the spelling or try another location.`)
        // }

        let cName;
        let tempKelvin;
        let tempCelsius;
        let visibility;
        let airPressure;
        let humidity;
        let windSpeed;
        let status;
        let maxtemp;
        let mintemp;
        let iconUrl;


        const currentDate = getCurrentDate();
    // console.log('Current Date:', currentDate);


        if (city.toLowerCase() === weather.name.toLowerCase()) {

        const iconCode = weather.weather[0].icon;
        iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;

          cName = weather.name
        //   console.log(`hi${cName}`);

          tempKelvin = weather.main.temp
          tempCelsius = (tempKelvin - 273.15).toFixed(2);
        //   console.log(`hi ${tempCelsius}`);
          
          visibility = (weather.visibility)/1000
        //   console.log(visibility);

          airPressure = weather.main.pressure
        //   console.log(airPressure);

          humidity = weather.main.humidity
        //   console.log(humidity);

          windSpeed = weather.wind.speed;
        //   console.log(windSpeed);

          status = weather.weather[0].main
        //   console.log(status);

          mintemp = (weather.main.temp_min - 273.15).toFixed(2)

          maxtemp = (weather.main.temp_max - 273.15).toFixed(2)
        }

        document.getElementById("celsius").innerHTML = `${tempCelsius}°C`;
        document.getElementById("status").innerHTML = status;
        document.getElementById("date").innerHTML = currentDate;
        document.getElementById("city").innerHTML = `<img src="/images/352521_location_on_icon.png" alt="Location Image" class="location-image">${cName}`;
        document.getElementById("max").innerHTML = `max: ${maxtemp}°C`;
        document.getElementById("min").innerHTML = `min: ${mintemp}°C`;
        document.getElementById("wind").innerHTML = `${windSpeed} m/s`;
        document.getElementById("humid").innerHTML = `${humidity} %`;
        document.getElementById("visib").innerHTML = `${visibility} km`;
        document.getElementById("air").innerHTML = `${airPressure} mb`;
        document.getElementById("weatherIcon").src = iconUrl;




        }
        catch (err) {
            console.error(err);
            if (err.message.includes("404")) {
              alert(`Sorry, we couldn't find information for ${city}. Please check the spelling or try another location.`);
            } else {
              alert("An error occurred. Please try again later.");
            }
          }
          
    }

    

    
      
      
    
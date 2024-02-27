////$(document).foundation(); unnecessary code as this is used when working with the Foundations Framework JavaScript link
//? Wrapping all code that interacts with the DOM in this jQuery function to prevent the JS interactions from executing until all HTML contents fully load:
$(function() {
  //TODO: Function to update current timezone in real time
  var intervalId;

  function updateTime() {
    var dateToday = dayjs(); 
    $('#dateToday').text('Local timezone: ' + dateToday.format( 'MMM-DD-YYYY @ h:mm:ss a'));
  }
  // Update date and time immediately
  updateTime();
  // Update date and time every second
  intervalId = setInterval(updateTime, 1000);

  function stopUpdatingTime() {
    clearInterval(intervalId);
  }

  // TODO Get document variables
  //! Variables for search Button
  var cityInput = document.querySelector('#cityInput');
  var searchButton = document.querySelector('#searchButton');
  var citiesList = document.querySelector('#citiesList');

  //! Variables for Today
  var cityNameToday = document.querySelector('#cityNameToday');
  var iconToday = document.querySelector('#iconToday');
  var tempToday = document.querySelector('#tempToday');
  var windToday = document.querySelector('#windToday');
  var humidityToday = document.querySelector('#humidityToday');

  //! Variables for day 1
  var iconDay1 = document.querySelector('#icon1');
  var temp1 = document.querySelector('#temp1');
  var wind1 = document.querySelector('#wind1');
  var humidity1 = document.querySelector('#humidity1');

  //! Variables for day 2
  var iconDay2 = document.querySelector('#icon2');
  var temp2 = document.querySelector('#temp2');
  var wind2 = document.querySelector('#wind2');
  var humidity2 = document.querySelector('#humidity2');

  //! Variables for day 3
  var iconDay3 = document.querySelector('#icon3');
  var temp3 = document.querySelector('#temp3');
  var wind3 = document.querySelector('#wind3');
  var humidity3 = document.querySelector('#humidity3');

  //! Variables for day 4
  var iconDay4 = document.querySelector('#icon4');
  var temp4 = document.querySelector('#temp4');
  var wind4 = document.querySelector('#wind4');
  var humidity4 = document.querySelector('#humidity4');

  //! Variables for day 5
  var iconDay5 = document.querySelector('#icon5');
  var temp5 = document.querySelector('#temp5');
  var wind5 = document.querySelector('#wind5');
  var humidity5 = document.querySelector('#humidity5');

  // TODO Function to get city weather
  function getCityWeather(cityName) {
    // Current weather API
    var apiKey = '191236f5840bae1e2eff2d05ededb79c';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + encodeURIComponent(cityName) + '&appid=' + apiKey;
    // API for 5-day forecast
    var apiKey2 = 'c4b88e7fec33307475fbafa327080e1e';
    var url5DayForecast = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=' + encodeURIComponent(cityName) +  '&appid=' + apiKey2;

    fetch(apiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    
    .then(data => {
      //* Display current weather data
      console.log('Current weather data:', data);
      // city
      var city = data.name;
      console.log('City:', city);
      cityNameToday.textContent = city;
      // time
      stopUpdatingTime(); // stop updating local timezone
      var unixTimestampToday = data.dt;
      console.log('Unix time:', unixTimestampToday);
      $('#dateToday').text(dayjs.unix(unixTimestampToday).format('dddd, MMMM DD, YYYY'));
      // icon
      var icon = data.weather[0].icon;
      console.log('Icon Code: ', icon);
      iconToday.src = 'https://openweathermap.org/img/w/' + icon + '.png';
      iconToday.classList.remove('hide');
      // temp
      var temperature = data.main.temp;
      console.log('Temperature:', temperature);
      tempToday.textContent = 'Current Temperature: ' + temperature + '°C';
      // wind
      var wind = data.wind.speed;
      console.log('Wind:', wind);
      windToday.textContent = 'Wind Speed: ' + wind + ' KM/H';
      // humidity
      var humidity = data.main.humidity;
      console.log('Humidity:', humidity);
      humidityToday.textContent = 'Humidity in the Air: ' + humidity + '%';
      
      fetch(url5DayForecast)
      .then(response => {
          if (response.ok) {
              return response.json();
          } else {
              throw new Error('Failed to fetch 5-day forecast data');
          }
      })
      
      .then(forecastData => {
        // Hide webpage descriptions and display 5-day forecast cards
        var weatherNextDays = document.querySelector('#weatherNextDays');
        weatherNextDays.classList.remove('hide');
        var description = document.querySelector('#description');
        description.classList.add('hide');
        var atNoonText = document.querySelector('#atNoonText');
        atNoonText.classList.remove('hide');
        //* Display 5-day forecast data
        console.log('5-day Forecast data:', forecastData);

        //! time 1
        var unixTimestamp1 = forecastData.list[5].dt;
        console.log('Unix time 1:', unixTimestamp1);
        $('#dateTomorrow').text(dayjs.unix(unixTimestamp1).format('dddd DD'));
        // icon 1
        var icon1 = forecastData.list[5].weather[0].icon;
        console.log('Icon Code 1: ', icon1);
        iconDay1.src = 'https://openweathermap.org/img/w/' + icon1 + '.png';
        // temp 1
        var tempDay1 = forecastData.list[5].main.temp;
        console.log('Temperature 1:', tempDay1);
        temp1.textContent = 'Temperature: ' + tempDay1 + '°C';
        // wind 1
        var windDay1 = forecastData.list[5].wind.speed;
        console.log('Wind 1:', windDay1);
        wind1.textContent = 'Wind: ' + windDay1 + ' KM/H';
        // humidity 1
        var humidityDay1 = forecastData.list[5].main.humidity;
        console.log('Humidity 1:', humidityDay1);
        humidity1.textContent = 'Humidity: ' + humidityDay1 + '%';

        //! time 2
        var unixTimestamp2 = forecastData.list[13].dt;
        console.log('Unix time 2:', unixTimestamp2);
        $('#dateDay2').text(dayjs.unix(unixTimestamp2).format('dddd DD'));
        // icon 2
        var icon2 = forecastData.list[13].weather[0].icon;
        console.log('Icon Code 2: ', icon2);
        iconDay2.src = 'https://openweathermap.org/img/w/' + icon2 + '.png';
        // temp 2
        var tempDay2 = forecastData.list[13].main.temp;
        console.log('Temperature 2:', tempDay2);
        temp2.textContent = 'Temperature: ' + tempDay2 + '°C';
        // wind 2
        var windDay2 = forecastData.list[13].wind.speed;
        console.log('Wind 2:', windDay2);
        wind2.textContent = 'Wind: ' + windDay2 + ' KM/H';
        // humidity 2
        var humidityDay2 = forecastData.list[13].main.humidity;
        console.log('Humidity 2:', humidityDay2);
        humidity2.textContent = 'Humidity: ' + humidityDay2 + '%';

        //! time 3
        var unixTimestamp3 = forecastData.list[21].dt;
        console.log('Unix time 3:', unixTimestamp3);
        $('#dateDay3').text(dayjs.unix(unixTimestamp3).format('dddd DD'));
        // icon 3
        var icon3 = forecastData.list[21].weather[0].icon;
        console.log('Icon Code 3: ', icon3);
        iconDay3.src = 'https://openweathermap.org/img/w/' + icon3 + '.png';
        // temp 3
        var tempDay3 = forecastData.list[21].main.temp;
        console.log('Temperature 3:', tempDay3);
        temp3.textContent = 'Temperature: ' + tempDay3 + '°C';
        // wind 3
        var windDay3 = forecastData.list[21].wind.speed;
        console.log('Wind 3:', windDay3);
        wind3.textContent = 'Wind: ' + windDay3 + ' KM/H';
        // humidity 3
        var humidityDay3 = forecastData.list[21].main.humidity;
        console.log('Humidity 3:', humidityDay3);
        humidity3.textContent = 'Humidity: ' + humidityDay3 + '%';

        //! time 4
        var unixTimestamp4 = forecastData.list[29].dt;
        console.log('Unix time 4:', unixTimestamp4);
        $('#dateDay4').text(dayjs.unix(unixTimestamp4).format('dddd DD'));
        // icon 4
        var icon4 = forecastData.list[29].weather[0].icon;
        console.log('Icon Code 4: ', icon4);
        iconDay4.src = 'https://openweathermap.org/img/w/' + icon4 + '.png';
        // temp 4
        var tempDay4 = forecastData.list[29].main.temp;
        console.log('Temperature 4:', tempDay4);
        temp4.textContent = 'Temperature: ' + tempDay4 + '°C';
        // wind 4
        var windDay4 = forecastData.list[29].wind.speed;
        console.log('Wind 4:', windDay4);
        wind4.textContent = 'Wind: ' + windDay4 + ' KM/H';
        // humidity 4
        var humidityDay4 = forecastData.list[29].main.humidity;
        console.log('Humidity 4:', humidityDay4);
        humidity4.textContent = 'Humidity: ' + humidityDay4 + '%';

        //! time 5
        var unixTimestamp5 = forecastData.list[37].dt;
        console.log('Unix time 5:', unixTimestamp5);
        $('#dateDay5').text(dayjs.unix(unixTimestamp5).format('dddd DD'));
        // icon 5
        var icon5 = forecastData.list[37].weather[0].icon;
        console.log('Icon Code 5: ', icon5);
        iconDay5.src = 'https://openweathermap.org/img/w/' + icon5 + '.png';
        // temp 5
        var tempDay5 = forecastData.list[37].main.temp;
        console.log('Temperature 5:', tempDay5);
        temp5.textContent = 'Temperature: ' + tempDay5 + '°C';
        // wind 5
        var windDay5 = forecastData.list[37].wind.speed;
        console.log('Wind 5:', windDay5);
        wind5.textContent = 'Wind: ' + windDay5 + ' KM/H';
        // humidity 5
        var humidityDay5 = forecastData.list[37].main.humidity;
        console.log('Humidity 5:', humidityDay4);
        humidity5.textContent = 'Humidity: ' + humidityDay5 + '%';

      })
      
      .catch(error => {
        console.error('Error fetching 5-day forecast data:', error);
      });

    })
    .catch(error => {
      console.error('Error:', error); 
      alert('Failed to fetch weather data for the selected city');
    });
  }
  
  // TODO Btn event listener
  searchButton.addEventListener('click', function () {
    var cityName = cityInput.value.trim();
    
    if (cityName !== '') {
      // Call function to get city weather
      getCityWeather(cityName);
      // Add inputted text as list items
      var listItem = document.createElement('li');
      listItem.textContent = cityName;
      // Add the new item to the beginning of the list
      citiesList.insertBefore(listItem, citiesList.firstChild);
      // Check if the number of items exceeds the limit
      if (citiesList.children.length > 1) {
        citiesList.removeChild(citiesList.lastChild);
      }
      // Remove bullet points and their spacing
      citiesList.style.listStyleType = 'none';
      citiesList.style.padding = '0';
      citiesList.style.margin = '0';

      // Add event listener to the new list item
      listItem.addEventListener('click', function() {
        getCityWeather(cityName);
      });
    } else {
      alert('Please enter a city name');
      return;
    }
  });

});

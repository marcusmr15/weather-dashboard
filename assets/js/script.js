////$(document).foundation();

$(function() {
  var dateToday = dayjs(); // Create a Day.js object for the current date
  $('#dateToday').text(dateToday.format( 'dddd MMMM DD, YYYY')); 

  var dateTomorrow = dateToday.add(1, 'day').format('dddd DD');
  $('#dateTomorrow').text(dateTomorrow);

  var dateDay2 = dateToday.add(2, 'day').format('dddd DD');
  $('#dateDay2').text(dateDay2);

  var dateDay3 = dateToday.add(3, 'day').format('dddd DD');
  $('#dateDay3').text(dateDay3);

  var dateDay4 = dateToday.add(4, 'day').format('dddd DD');
  $('#dateDay4').text(dateDay4);

  var dateDay5 = dateToday.add(5, 'day').format('dddd DD');
  $('#dateDay5').text(dateDay5);

  //! Varibales for search Button
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
   var temp1 = document.querySelector('#temp1');
   var wind1 = document.querySelector('#wind1');
   var humidity1 = document.querySelector('#humidity1');

   //! Variables for day 2
   var temp2 = document.querySelector('#temp2');
   var wind2 = document.querySelector('#wind2');
   var humidity2 = document.querySelector('#humidity2');

   //! Variables for day 3
   var temp3 = document.querySelector('#temp3');
   var wind3 = document.querySelector('#wind3');
   var humidity3 = document.querySelector('#humidity3');

   //! Variables for day 4
   var temp4 = document.querySelector('#temp4');
   var wind4 = document.querySelector('#wind4');
   var humidity4 = document.querySelector('#humidity4');

   //! Variables for day 5
   var temp5 = document.querySelector('#temp5');
   var wind5 = document.querySelector('#wind5');
   var humidity5 = document.querySelector('#humidity5');
  

  // TODO: Btn event listener
  searchButton.addEventListener('click', function () {
    var cityName = cityInput.value.trim();
  
    if (cityName !== '') {
      var apiKey = '191236f5840bae1e2eff2d05ededb79c';
      var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + encodeURIComponent(cityName) + '&appid=' + apiKey;
  
  
      fetch(apiUrl)
        .then(response => {
          if (response.ok) {
            // Add inputted text as list items
            var citiesSearched =cityInput.value;
            var listItem = document.createElement('li');
            listItem.textContent = citiesSearched;
          
            // Add the new item to the beginning of the list
            citiesList.insertBefore(listItem, citiesList.firstChild);

            // Check if the number of items exceeds the limit
            if (citiesList.children.length > 1) {
              citiesList.removeChild(citiesList.lastChild);
            }
            console.log(citiesList.children.length);
            // Remove bullet points and their spacing
            citiesList.style.listStyleType = 'none';
            citiesList.style.padding = '0';
            citiesList.style.margin = '0';
            return response.json();
          } else {
            throw new Error('Failed to fetch data');
          }
        })
        .then(data => {
          console.log(data);
          // Access the temperature value from the data object
          var city = data.name;
          console.log('City: ', city);
          cityNameToday.textContent = city;
          var icon = data.weather[0].icon;
          console.log('Icon Code: ', icon);
          iconToday.src = 'https://openweathermap.org/img/w/' + icon + '.png';
          
          
          var temperature = data.main.temp;
          console.log('Temperature:', temperature);
          tempToday.textContent = 'Temperature: ' + temperature + '°C';
          var wind = data.wind.speed;
          console.log('Wind:', wind);
          windToday.textContent = 'Wind: ' + wind + ' KM/H';
          var humidity = data.main.humidity;
          console.log('Humidity:', humidity);
          humidityToday.textContent = 'Humidity: ' + humidity + ' %';
        })
        .catch(error => {
          console.error('Error:', error);
          alert('This city does not exists')
          return;
        })
    } else {            
      alert('Please enter a city name');
      return;
    }
  });

});


//?This goes after the if (response.ok)
            // // Add inputted text as list items
            // var citiesSearched =cityInput.value;
            // var listItem = document.createElement('li');
            // listItem.textContent = citiesSearched;
          
            // // Add the new item to the beginning of the list
            // citiesList.insertBefore(listItem, citiesList.firstChild);

            // // Check if the number of items exceeds the limit
            // if (citiesList.children.length > 1) {
            //   citiesList.removeChild(citiesList.lastChild);
            // }
            // console.log(citiesList.children.length);
            // // Remove bullet points and their spacing
            // citiesList.style.listStyleType = 'none';
            // citiesList.style.padding = '0';
            // citiesList.style.margin = '0';
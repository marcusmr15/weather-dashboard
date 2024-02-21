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

  //! Varibales
  var cityInput = document.querySelector('#cityInput');
  var searchButton = document.querySelector('#searchButton');
  var citiesList = document.querySelector('#citiesList');

  // TODO: Btn event listener
  searchButton.addEventListener('click', function () {
    var cityName = cityInput.value.trim();
  
    if (cityName !== '') {
      var apiKey = '191236f5840bae1e2eff2d05ededb79c';
      var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=' + encodeURIComponent(cityName) + '&appid=' + apiKey;
  
  
      fetch(apiUrl)
        .then(response => {
          if (response.ok) {
            var citiesSearched =cityInput.value;
    var listItem = document.createElement('li');
    listItem.textContent = citiesSearched;
    citiesList.appendChild(listItem);
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


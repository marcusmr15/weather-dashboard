$(document).foundation();

$(function() {
    const apiUrl = 'https://api.example.com/data';

    // Make a GET request to the API endpoint
    fetch(apiUrl)
      .then(response => {
        // Check if the request was successful
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Parse the response as JSON
        return response.json();
      })
      .then(data => {
        // Handle the data from the API
        console.log(data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('There was a problem with the fetch operation:', error);
      });

});

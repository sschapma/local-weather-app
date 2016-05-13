$(document).ready(function() {
  $('.cel').hide(); //show fahrenheit by default
  findCurrentLocation(); //get ip to display local weather
  
  // performs city search by pressing enter
  $(document).keypress(function (e) {
    if (e.which == 13) {
      search();
      return false;
  }
});
});

// get ip info to find current city and generate API url
function findCurrentLocation() {
  $.getJSON('http://ip-api.com/json', function(ip) {
    var city = "";
    city += ip.city + "," + ip.countryCode;
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fd89b796751bb4f76ca22ef0daab6ba1";
  $.getJSON(weatherUrl)
    .done(display)
    .fail(error);
  });
};

// if weather API exists, generates data to display on page
function display(data) {
  // calculates number value for temp in F and C
  var celsius = Math.round(data.main.temp - 273.15);
  var fahrenheit = Math.round(data.main.temp * 9 / 5 - 459.67);
  var units = "F";
  $(".units").on("click", changeUnits);
  
  // displays data on page
  getIcon(data.weather[0].icon);
  $(".num").html(fahrenheit);
  $(".weatherDescr").html(data.weather[0].description);
  $(".location").html(data.name);

  // changes units between F and C
  function changeUnits() {
    if (units == "F") {
      units = "C";
      $(".num").html(celsius);
      $(".cel").show();
      $(".far").hide();
    } else {
      units = "F";
      $(".num").html(fahrenheit);
      $(".far").show();
      $(".cel").hide();
    }
  };
};

//if there is a problem with weather API
function error() {
  alert("Sorry, we can't find information on that location. Please try again.");
};

//takes icon code, displays the appropriate weather icon && changes bgcolor and font
function getIcon(iconCode) {
  switch (iconCode) {
    case '01d':
      $(".weatherIcon").html("<i class='wi wi-day-sunny'></i>");
      $("body").css("background-color", "#2A4DAC");
      $("body").css("color", "#FFDC27");
      $(".weatherIcon").css("margin-bottom", "-10px");
      break;
    case '02d':
      $(".weatherIcon").html("<i class='wi wi-day-cloudy'></i>");
      $("body").css("background-color", "#002E91");
      $("body").css("color", "#ADC7FF");
      break;
    case '03d':
      $(".weatherIcon").html("<i class='wi wi-cloud'></i>");
      $("body").css("background-color", "#002E91");
      $("body").css("color", "#ADC7FF");
      break;
    case '04d':
      $(".weatherIcon").html("<i class='wi wi-cloudy'></i>");
      $("body").css("background-color", "#002E91");
      $("body").css("color", "#ADC7FF");
      break;
    case '09d':
      $(".weatherIcon").html("<i class='wi wi-sprinkle'></i>");
      $("body").css("background-color", "#4D648D");
      $("body").css("color", "#ADC7FF");
      $(".weatherIcon").css("margin-bottom", "-10px");
      break;
    case '10d':
      $(".weatherIcon").html("<i class='wi wi-day-sprinkle'></i>");
      $("body").css("background-color", "#4D648D");
      $("body").css("color", "#ADC7FF");
      $(".weatherIcon").css("margin-bottom", "-10px");
      break;
    case '11d':
      $(".weatherIcon").html("<i class='wi wi-thunderstorm'></i>");
      $("body").css("background-color", "#4D648D");
      $("body").css("color", "#ADC7FF");
      $(".weatherIcon").css("margin-bottom", "30px");
      break;
    case '13d':
      $(".weatherIcon").html("<i class='wi wi-snow'></i>");
      $("body").css("background-color", "#8DB1FF");
      $("body").css("color", "white");
      $(".weatherIcon").css("margin-bottom", "30px");
      break;
    case '50d':
      $(".weatherIcon").html("<i class='wi wi-day-haze'></i>");
      $("body").css("background-color", "#03003A");
      $("body").css("color", "#543800");
      break;
    case '01n':
      $(".weatherIcon").html("<i class='wi wi-night-clear'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#FFF270");
      break;
    case '02n':
      $(".weatherIcon").html("<i class='wi wi-night-alt-cloudy'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#6E5191");
      break;
    case '03n':
      $(".weatherIcon").html("<i class='wi wi-cloud'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#6E5191");
      break;
    case '04n':
      $(".weatherIcon").html("<i class='wi wi-night-cloudy'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#6E5191");
      break;
    case '09n':
      $(".weatherIcon").html("<i class='wi wi-night-sprinkle'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#92A539");
      $(".weatherIcon").css("margin-bottom", "-10px");
      break;
    case '10n':
      $(".weatherIcon").html("<i class='wi wi-night-rain'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#92A539");
      $(".weatherIcon").css("margin-bottom", "20px");
      break;
    case '11n':
      $(".weatherIcon").html("<i class='wi wi-night-thunderstorm'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#92A539");
      $(".weatherIcon").css("margin-bottom", "30px");
      break;
    case '13n':
      $(".weatherIcon").html("<i class='wi wi-night-snow'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "white");
      $(".weatherIcon").css("margin-bottom", "30px");
      break;
    case '50n':
      $(".weatherIcon").html("<i class='wi wi-night-fog'></i>");
      $("body").css("background-color", "#110224");
      $("body").css("color", "#465016");
      $(".weatherIcon").css("margin-bottom", "0px");
      break;
    default:
      $(".weatherIcon").html("<i class='wi wi-na'></i>");
      $(".weatherIcon").css("margin-bottom", "-70px");
      break;
  }
};

//takes user input and generates new data
function search() {
  var cityVal = $('.searchbox').val();
  cityVal = cityVal.trim();  
  $('.searchbox').val('');
  var customUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityVal + "&appid=fd89b796751bb4f76ca22ef0daab6ba1";
  $.getJSON(customUrl)
     .done(display)
     .fail(error);
  };
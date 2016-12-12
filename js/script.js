jQuery(document).ready(function($) {


  var api = "85715ab081aa5f5f";
  var baseUrl = "https://api.wunderground.com/api/85715ab081aa5f5f/forecast/conditions";
  
  var cities = [];
  getWeather();
  
  // get weather station for future match to city
  function getWeather(){
 // get weather info
  $.ajax({ 
url: baseUrl + "/q/autoip.json", 
headers: {"Content-Type":"application/json","Accept": "application/json" },
dataType: "jsonp",
data: "jsonp", 
cache: 'false', 

success: function(parsed_json) {   
  
      var weatherInfo = parsed_json.current_observation;
 	  var locat = weatherInfo.display_location.full;
	  var type = weatherInfo.weather;
	  var wind_dir = weatherInfo.wind_dir;
	  var wind_spd = weatherInfo.wind_mph;	 
	  var ico;
	  var tempSwap = true;
	  
  
	  $("#locat").html(locat);
	  $("#type").html(type);

	  $("#wind").html(wind_dir);
      $("#wind_spd").html(wind_spd);
	  $("#ico").html(ico);
	  
// temp f/c conversion	  
	  var temp_f = weatherInfo.temp_f;
	  temp_f = Math.round(temp_f);
	  
	  temp_f += "<span>&deg; F </span>";
    
	  var temp_c = weatherInfo.temp_c;
	  temp_c = Math.round(temp_c);
	  temp_c += "<span>&deg; C </span>";
	  
	  $("#temp").html(temp_f);  
	  
    $("#temp").click(function (){
      if (tempSwap === true){
        $("#temp").html(temp_c);
    tempSwap = false;
	}
	 else  {
        $("#temp").html(temp_f);
		tempSwap = true;
    } 
	
	 if (type === "Clear" || type === "Sunny") {
	 $("body").css("background-image","url(https://www.konikodes.com/fcc/img/clear.jpg)");
	 
} else if (type === "Mostly Cloudy" || type === "Partly Sunny"){
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/mostly-cloudy.jpg)");
}
else if 
 (type === "Partly Cloudy" || type === "Mostly Sunny" || type === "Scattered Clouds"){
     $("body").css("background-image","url(https://www.konikodes.com/fcc/img/partly-cloudy.jpg)");
}
else if 
(type === "Cloudy" || type === "Overcast") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/overcast.jpg)");
 }
 else if 
(type === "Haze" || type === "Hazy") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/hazy.jpg)");
 }
 else if 
(type === "Fog" || type === "Foggy") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/fog.jpg)");
 }
  else if 
(type === "Rain" || type === "Light Rain" || type === "Rainy" || type === "Chance of Rain") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/rain.jpg)");
 }

  else if 
(type === "Thunderstorms" || type === "Thunderstorms" || type === "Chance of Thunderstorms" || type === "Chance of Thunderstorm" || type === "Unknown") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/stormy.jpg)");
 }
    else if 
(type === "Freezing Rain" || type === "Sleet" || type === "Chance of Freezing Rain" || type === "Chance of Sleet") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/sleet.jpg)");
 }
   else if 
(type === "Snow" || type === "Flurries" || type === "Chance of Snow" || type === "Chance of Flurries") {
   $("body").css("background-image","url(https://www.konikodes.com/fcc/img/snowy.jpg)");
 }
else {
    $("body").css("background-image","url(https://www.konikodes.com/fcc/img/clear.jpg)");
}
});

$("#searchName").autocomplete({
  autoFocus: false,
  delay: 500,
  focus: function (event, ui) {
    $("#searchName").val(ui.item.value);
  },
  minLength: 3,
  open: function () {
    // prevent the need for double-tap on mobile to select menu item
    $('.ui-autocomplete').off('menufocus hover mouseover');
  },
  select: function (event, ui) {
    getWeather(cities[cities.indexOf(ui.item.value) + 1]);
  },
  source: cities,
})
.keyup(function (e) {
  var key = e.keyCode || e.which,
      cityAutoComplete = 'http://autocomplete.wunderground.com/aq?cb=?&query=' +
                        $("#searchName").val();

  // clear search field when user presses esc
  if (key === 27) $("#searchName").val('');

  if ($("#searchName").val().length > 2 &&
     (key === 8 | key === 32 | key === 44 | key === 46) |
     (key >= 65 && key <= 90) | (key >= 97 && key <= 122)) {

    cities.length = 0; // clear the array for a new list of cities

  $.ajax({ 
   url: cityAutoComplete, 
   dataType: "jsonp",
   data: "json",
   crossOrigin:"true", 
   cache: "false", 

success: function(data) {
      $.each(data.RESULTS, function (i) {
        var city = data.RESULTS[i].name;
        if (city.indexOf(',') > -1 && cities.indexOf(city) < 0)  {
          cities.push(city, data.RESULTS[i].l);

}

    error: (function (err) {
      console.log('Error: ' + JSON.stringify(err));
    })
  });
}
    });
   }
   });
   }
   });
   }
   });

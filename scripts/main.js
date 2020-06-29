// Set api token for mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bWlzIiwiYSI6ImNrOHlpeDRoeTAyZnczbGtvcWEzNjN3YmYifQ.gNlh9NQUcb7mvtSnXaAE0A';

// api token for openWeatherMap
var openWeatherMapUrl = 'https://api.openweathermap.org/data/2.5/weather';
var openWeatherMapUrlApiKey = 'e810be15a88773b50f703b5a6bc6977f';

// Determine cities
let cities = [
  {
    name: 'Amsterdam',
    coordinates: [4.895168, 52.370216]
  },
  {
    name: 'Rotterdam',
    coordinates: [4.47917, 51.9225]
  },
  {
    name: 'Nijmegen',
    coordinates: [5.85278, 51.8425]
  },
  {
    name: 'Maastricht',
    coordinates: [5.68889, 50.84833]
  },
  {
    name: 'Groningen',
    coordinates: [6.56667, 53.21917]
  },
  {
    name: 'Enschede',
    coordinates: [6.89583, 52.21833]
  },
];

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/outdoors-v11',
  center: [5.508852, 52.142480],
  zoom: 7
});

map.on('load', function () {
  cities.forEach(function(city) {
    // Usually you do not want to call an api multiple times, but in this case we have to
    // because the openWeatherMap API does not allow multiple lat lon coords in one request.
    var request = openWeatherMapUrl + '?' + 'appid=' + openWeatherMapUrlApiKey + '&lon=' + city.coordinates[0] + '&lat=' + city.coordinates[1];

    // Get current weather based on cities' coordinates
    fetch(request)
        .then(function(response) {
          if(!response.ok) throw Error(response.statusText);
          return response.json();
        })
        .then(function(response) {
          // Then plot the weather response + icon on MapBox
          plotImageOnMap(response.weather[0].icon, city, response.wind.deg, response.wind.speed);
          console.log(response.wind.deg);
        })
        .catch(function (error) {
          console.log('ERROR:', error);
        });
  });
})

map.on('click', function(e) { //op muisklik word functie gestart

  //e.lngLat is the longitude, latitude geographical position of the event
  let lng = e.lngLat.lng //longitude gegevens
  let lat = e.lngLat.lat //latitude gegevens
  let recommendationMessage;

  let clickRequest = openWeatherMapUrl + '?' + 'lat=' + lat + '&lon=' + lng + '&appid=' + openWeatherMapUrlApiKey; //link voor gegevens van selecteerde locatie op basis van latitude en longitude

  fetch(clickRequest)
      .then(function(response) {
        if(!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then(function(response) {
        //cities.push("name: '" , response.id ,"',\ncoordinates: [" , lng , ", " , lat , "])");
          //cities.push(cities, [response.name])
          cities.push({name: response.name , coordinates: [lng ,lat]});
          plotImageOnMap(response.weather[0].icon, cities[cities.length-1], response.wind.deg, response.wind.speed);
          document.getElementById('recommendationText').innerHTML = "Recommendation:";
          if (response.wind.speed > 8 && response.wind.speed < 15 ){
              document.getElementById('recommendationData').innerHTML = "It will be a bit risky to land here since the windspeed is " + response.wind.speed + " m/s";
              document.body.style.backgroundColor = "orange";
          } else if (response.wind.speed >= 15){
              document.getElementById('recommendationData').innerHTML = "It is advised to not land here since the windspeed is " + response.wind.speed + " m/s";
              document.body.style.backgroundColor = "red";
          } else{
              document.getElementById('recommendationData').innerHTML = "It should be safe to land since the windspeed is " + response.wind.speed + " m/s";
              document.body.style.backgroundColor = "green";
          }
          console.log(cities);
          console.log(cities[cities.length-1]);
          console.log(response.wind.speed);
          console.log(response.name);
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });

});

function plotImageOnMap(icon, city, windrotation, windspeed) {
  map.loadImage(
      'https://img.icons8.com/plasticine/2x/arrow.png',
      function (error, image) {
        if (error) throw error;
        map.addImage("arrow_" + city.name, image);
        map.addSource("point_" + city.name, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: city.coordinates
              }
            }]
          }
        });
        map.addLayer({
          id: "points_" + city.name,
          type: "symbol",
          source: "point_" + city.name,
          layout: {
            "icon-image": "arrow_" + city.name,
            "icon-rotate": 90+windrotation,
            "icon-size": windspeed*0.05

          },
          paint:{
            "icon-opacity": 0.70
          }
        });
      }
  );
}
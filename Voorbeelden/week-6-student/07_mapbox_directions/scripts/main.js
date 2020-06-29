// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bWlzIiwiYSI6ImNrOHlpeDRoeTAyZnczbGtvcWEzNjN3YmYifQ.gNlh9NQUcb7mvtSnXaAE0A';
	
// Initialate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.322840, 52.067101],
  zoom: 11.15
});

// Voeg de planner toe
map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken
  }),
  'top-left'
);
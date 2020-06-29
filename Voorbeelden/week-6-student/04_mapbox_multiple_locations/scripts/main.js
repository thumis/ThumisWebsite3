// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bWlzIiwiYSI6ImNrOHlpeDRoeTAyZnczbGtvcWEzNjN3YmYifQ.gNlh9NQUcb7mvtSnXaAE0A';

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-77.04, 38.907],
  zoom: 11
});

// wacht totdat de map geladen is
map.on('load', function () {

  // nieuwe source places
  map.addSource('places', {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      // Saved in locations.js
      'features': myLocationsList
    }
  });

  // Add a layer showing the places.
  map.addLayer({
    'id': 'places',
    'type': 'symbol',
    'source': 'places',
    'layout': {
      'icon-image': '{icon}-15', // icon verwijst naar de properties in het object met een plaats en wordt vervangen
      'icon-allow-overlap': true
    }
  });
});
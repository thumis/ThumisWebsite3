// Set api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGh1bWlzIiwiYSI6ImNrOHlpeDRoeTAyZnczbGtvcWEzNjN3YmYifQ.gNlh9NQUcb7mvtSnXaAE0A';

// Init map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [4.32284, 52.067101],
  zoom: 11.15
});

// wacht tot de map en styles geladen zijn
map.on('load', function () {

  // laad een extern bestand
  map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', function (error, image) {

      // voeg image toe
      map.addImage('cat', image);

      // defineer een punt in het geheugen
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [4.32284, 52.067101]
            }
          }]
        }
      });

      // plak de nieuwe source 'point' op de kaart in een eigen layer
      map.addLayer({
        id: 'points',
        type: 'symbol',
        source: 'point',
        layout: {
          'icon-image': 'cat',
          'icon-size': 0.25
        }
      });
    }
  );
});